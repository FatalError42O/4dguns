local Ammo_handler = leef.class.new_class:inherit({
    name = "Ammo_handler",

    construct = function(self)
        if self.instance then
            assert(self.gun, "no gun")
            self.handler = self.gun.handler
            self.inventory = self.handler.inventory
            local meta = self.gun.meta
            local gun = self.gun
            self.ammo = {}
            if gun.properties.ammo then
                --this is pretty inefficient it's been built on. Refactor later maybe.
                local spawn_with = meta:get_int("guns4d_spawn_with_ammo")
                if (meta:get_string("guns4d_loaded_rounds") == "")  and  ((spawn_with > 0) or (Guns4d.config.interpret_initial_wear_as_ammo)) then
                    local rounds = (spawn_with > 0 and spawn_with) or (1-(self.gun.itemstack:get_wear()/65535))
                    if gun.properties.ammo.magazine_only then
                        local magname = gun.properties.ammo.accepted_magazines[1]
                        rounds = math.floor(Guns4d.ammo.registered_magazines[magname].capacity*rounds)
                        self.ammo.loaded_mag = magname
                        self.ammo.loaded_rounds = {
                            [Guns4d.ammo.registered_magazines[magname].accepted_rounds[1]] = rounds
                        }
                    else
                        self.ammo.loaded_mag = "empty"
                        self.ammo.loaded_rounds = gun.properties.accepted_rounds[1]
                    end
                    self.ammo.total_rounds = rounds
                    gun.itemstack:set_wear(0)
                    meta:set_int("guns4d_spawn_with_ammo", 0)
                    self:update_meta()
                else
                    --create or reinitialize ammo data
                    if meta:get_string("guns4d_loaded_rounds") == "" then
                        local ammo_props = gun.properties.ammo
                        self.ammo.loaded_mag = ammo_props.initial_mag or (ammo_props.accepted_magazines and ammo_props.accepted_magazines[1]) or "empty"
                        self.ammo.chambered_round = "empty"
                        self.ammo.total_rounds = 0
                        self.ammo.loaded_rounds = {}
                        self:update_meta()
                    else
                        self.ammo.loaded_mag = meta:get_string("guns4d_loaded_mag")
                        self.ammo.loaded_rounds = minetest.deserialize(meta:get_string("guns4d_loaded_rounds"))
                        self.ammo.total_rounds = meta:get_int("guns4d_total_rounds") --TODO: REMOVE total_rounds AS A META
                        self.ammo.chambered_round = meta:get_string("guns4d_chambered_round")
                    end
                end
                local ammo = self.ammo
                self.gun.property_modifiers["ammo_handler"] = function(gun)
                    local round_mod = (Guns4d.ammo.registered_ammo[ammo.chambered_round] and Guns4d.ammo.registered_ammo[ammo.chambered_round].modifier) or nil
                    local magazine_mod = (Guns4d.ammo.registered_magazines[ammo.loaded_mag] and Guns4d.ammo.registered_magazines[ammo.loaded_mag].modifier) or nil
                    if round_mod then round_mod(gun) end
                    if magazine_mod then magazine_mod(gun) end
                end
            end
        end
    end
})
Guns4d.ammo_handler = Ammo_handler
--spend the round, return false if impossible.
--updates all properties based on the ammo table, bullets string can be passed directly to avoid duplication (when needed)
function Ammo_handler:update_meta(rounds)
    assert(self.instance, "attempt to call object method on a class")
    local meta = self.gun.meta
    meta:set_string("guns4d_loaded_mag", self.ammo.loaded_mag)
    meta:set_string("guns4d_loaded_rounds", rounds or minetest.serialize(self.ammo.loaded_rounds))
    meta:set_int("guns4d_total_rounds", self.ammo.total_rounds)
    meta:set_string("guns4d_chambered_round", self.ammo.chambered_round)
    self.ammo.magazine_psuedo_empty = false
    if self.gun.ammo_handler then --if it's a first occourance it cannot work.
        self.gun:update_image_and_text_meta(meta)
    end
    self.handler.player:set_wielded_item(self.gun.itemstack)
end
local mat4 = leef.math.mat4
local m1 = mat4.identity()
function Ammo_handler:get_magazine_bone_info()
    local gun = self.gun
    local handler = self.gun.handler
    local node = leef.b3d_nodes.get_node_by_name(gun.b3d_model, gun.consts.MAG_BONE, true)
    --get trans of first frame
    if not node then
        minetest.log("warning", "improperly set gun magazine bone name, could not properly calculate magazine transformation.")
        return self.gun.pos, vector.new(), vector.new()
    end

    --local pos1 = vector.new(leef.b3d_nodes.get_node_global_position(nil, node, true, math.floor(gun.animation_data.current_frame)))
    --local pos2 = vector.new(leef.b3d_nodes.get_node_global_position(nil, node, true))

    local rest_t, _ = leef.b3d_nodes.get_node_global_transform(node, gun.animation_data.current_frame, gun.properties.visuals.animations.loaded.x)
    local t, _ = leef.b3d_nodes.get_node_global_transform(node, gun.animation_data.current_frame, 1)
    t = mat4.multiply(m1, t, self.gun:get_rotation_transform(m1))
    local scale = gun.properties.visuals.scale
    local pos = gun.handler:get_pos()+self.gun:get_pos({x=t[13]*scale, y=t[14]*scale, z=t[15]*scale})
    --local vel = (pos2-pos1)*((gun.animation_data.current_frame-math.floor(gun.animation_data.current_frame))/gun.animation_data.fps)+self.gun.player:get_velocity()
    local rot = vector.new(mat4.multiply(mat4.identity(), t, rest_t:invert(rest_t)):get_rot_luanti_entity())
    return pos, vector.new(), rot
end
--use a round, called when the gun is shot. Returns a bool indicating success.
function Ammo_handler:spend_round()
    assert(self.instance, "attempt to call object method on a class")
    local round_spent = self.ammo.chambered_round
    local meta = self.gun.meta
    --subtract the bullet
    if (self.ammo.total_rounds > 0) and (round_spent ~= "empty") then
        --only actually subtract the round if infinite_ammo is false.
        if not self.handler.infinite_ammo then
            self.ammo.loaded_rounds[round_spent] = self.ammo.loaded_rounds[round_spent]-1
            if self.ammo.loaded_rounds[round_spent] == 0 then self.ammo.loaded_rounds[round_spent] = nil end
            self.ammo.total_rounds = self.ammo.total_rounds - 1
            if (self.ammo.total_rounds == 0) and (self.gun.properties.charging.bolt_charge_mode == "catch") then
                self.gun.bolt_charged = true
            end
        end
            --set the new current bullet
        if next(self.ammo.loaded_rounds) then
            self.ammo.chambered_round = Guns4d.math.weighted_randoms(self.ammo.loaded_rounds)
            meta:set_string("guns4d_chambered_round", self.ammo.chambered_round)
        else
            self.ammo.chambered_round = "empty"
            meta:set_string("guns4d_chambered_round", "empty")
            if self.gun.properties.charging.bolt_charge_mode == "catch" then
                self.gun.bolt_charged = true
            end
        end

        self:update_meta()
        return round_spent
    end
end
function Ammo_handler:can_spend_round()
    local round_spent = self.ammo.chambered_round
    if (self.ammo.total_rounds > 0) and (round_spent ~= "empty") then
        return true
    end
    return false
end
function Ammo_handler:chamber_round()
    self.ammo.chambered_round = Guns4d.math.weighted_randoms(self.ammo.loaded_rounds) or "empty"
end
local function tally_ammo_from_meta(meta)
    local string = meta:get_string("guns4d_loaded_rounds")
    if string=="" then return 0 end
    local count = 0
    for i, v in pairs(minetest.deserialize(string)) do
        count=count+v
    end
    return count
end
local function tally_ammo(ammo)
    local total = 0
    for i, v in pairs(ammo) do
        total = total + v
    end
    return total
end
function Ammo_handler:load_magazine()
    assert(self.instance, "attempt to call object method on a class")
    local inv = self.inventory
    local magstack_index
    local highest_ammo = -1
    local gun = self.gun
    local gun_accepts = gun.accepted_magazines
    if self.ammo.loaded_mag ~= "empty" or self.ammo.total_rounds > 0 then
        --it's undefined, make assumptions.
        self:unload_all()
    end
    for i, v in pairs(inv:get_list("main")) do
        if gun_accepts[v:get_name()] then
            local mag_meta = v:get_meta()
            --intiialize data if it doesn't exist so it doesnt kill itself
            if mag_meta:get_string("guns4d_loaded_rounds") == "" then
                Guns4d.ammo.initialize_mag_data(v)
                inv:set_stack("main", i, v)
            end
            local ammo = tally_ammo_from_meta(mag_meta)
            if ammo > highest_ammo then
                highest_ammo = ammo
                local has_unaccepted = false
                for bullet, _ in pairs(minetest.deserialize(mag_meta:get_string("guns4d_loaded_rounds"))) do
                    if not gun.accepted_rounds[bullet] then
                        has_unaccepted = true
                        break
                    end
                end
                if not has_unaccepted then magstack_index = i end
            end
        end
    end
    if magstack_index then
        local magstack = inv:get_stack("main", magstack_index)
        local magstack_meta = magstack:get_meta()
        --get the ammo stuff

        local bullet_string = magstack_meta:get_string("guns4d_loaded_rounds")
        local ammo = self.ammo
        ammo.loaded_mag = magstack:get_name()
        ammo.loaded_rounds = minetest.deserialize(bullet_string)
        ammo.total_rounds = tally_ammo(ammo.loaded_rounds)
        if self.gun.bolt_charged or (self.gun.properties.charging.bolt_charge_mode == "none") then
            ammo.chambered_round = Guns4d.math.weighted_randoms(ammo.loaded_rounds) or "empty"
            self.gun.bolt_charged = false
        else
            ammo.chambered_round = "empty"
        end
        self:update_meta()
        inv:set_stack("main", magstack_index, "")
        return
    end
end
function Ammo_handler:load_single_cartridge()
    local inv = self.inventory
    local gun = self.gun
    local ammo = self.ammo
    local bullet
    if self.ammo.total_rounds >= gun.properties.ammo.capacity then return false end
    for i, v in pairs(inv:get_list("main")) do
        if gun.accepted_rounds[v:get_name()] then
            self:update_meta()
            bullet = v:get_name()
            v:take_item(1)
            inv:set_stack("main", i, v)
            break
        end
    end
    if bullet then
        ammo.loaded_rounds[bullet] = (ammo.loaded_rounds[bullet] or 0)+1
        ammo.total_rounds = ammo.total_rounds+1
        if self.gun.bolt_charged or (self.gun.properties.charging.bolt_charge_mode == "none") then
            ammo.chambered_round = Guns4d.math.weighted_randoms(ammo.loaded_rounds) or "empty"
            self.gun.bolt_charged = false
        else
            ammo.chambered_round = "empty"
        end
        self:update_meta()
        return true
    end
    return false
end
function Ammo_handler:inventory_has_ammo(only_cartridges)
    local inv = self.inventory
    local gun = self.gun
    for i, v in pairs(inv:get_list("main")) do
        if (not only_cartridges) and gun.accepted_magazines[v:get_name()] and (tally_ammo_from_meta(v:get_meta())>0) then
            return true
        end
        if ((only_cartridges or not gun.properties.ammo.magazine_only) and gun.accepted_rounds[v:get_name()]) then
            return true
        end
    end
    return false
end
function Ammo_handler:can_load_magazine()
    local inv = self.inventory
    local gun = self.gun
    local gun_accepts = gun.accepted_magazines
    for i, v in pairs(inv:get_list("main")) do
        if gun_accepts[v:get_name()] then
            return true
        end
    end
    return false
end
--state will automatically set reset on update_meta()
function Ammo_handler:set_unloading(bool)
    self.ammo.magazine_psuedo_empty = bool
    self.gun:update_image_and_text_meta()
    self.gun.player:set_wielded_item(self.gun.itemstack)
end
function Ammo_handler:unload_magazine(to_ground)
    assert(self.instance, "attempt to call object method on a class")
    if self.ammo.loaded_mag ~= "empty" then
        local inv = self.handler.inventory
        local magstack = ItemStack(self.ammo.loaded_mag)
        local magmeta = magstack:get_meta()
        local gunmeta = self.gun.meta
        --set the mag's meta before updating ours and adding the item.
        magmeta:set_string("guns4d_loaded_rounds", gunmeta:get_string("guns4d_loaded_rounds"))
        --magmeta:set_string("guns4d_total_rounds", gunmeta:get_string("guns4d_total_rounds"))
        if not Guns4d.ammo.registered_magazines[magstack:get_name()] then minetest.log("error", "player `"..self.gun.player:get_player_name().."` ejected an unregistered magazine: `"..magstack:get_name().." `from a gun") else
            magstack = Guns4d.ammo.update_mag(nil, magstack, magmeta)
        end
        --throw it on the ground if to_ground is true
        local remaining
        if to_ground then
            remaining = magstack
        else
            remaining = inv:add_item("main", magstack)
        end
        --eject leftover or full stack
        if remaining:get_count() > 0 then
            local pos, vel, rot = self:get_magazine_bone_info()
            local object = minetest.add_item(pos, remaining)
            object:set_velocity(vel)
            object:set_rotation(vector.new())
        end
        self.ammo.loaded_mag = "empty"
        self.ammo.chambered_round = "empty"
        self.ammo.total_rounds = 0
        self.ammo.loaded_rounds = {}
        self:update_meta()
    end
end
--this is used for unloading flat, or unloading as a "clip" aka a feed only magazine, you'd use this for something like an m1 garand. God that ping.
function Ammo_handler:unload_all(to_ground)
    assert(self.instance, "attempt to call object method on a class")
    local inv = self.handler.inventory
    for i, v in pairs(self.ammo.loaded_rounds) do
        local leftover
        --if to_ground is true throw it to the ground
        if to_ground then
            leftover = ItemStack("main", i.." "..tostring(v))
        else
            leftover = inv:add_item("main", i.." "..tostring(v))
        end
        if leftover:get_count() > 0 then --I don't know itemstacks well enough to know if I need this (for leftover stack of add_item)
            local object = minetest.add_item(self.gun.pos, leftover)
        end
    end
    if self.ammo.loaded_mag ~= "empty" then
        local stack
        if to_ground or Guns4d.ammo.registered_magazines[self.ammo.loaded_mag].hot_eject then
            stack = ItemStack(self.ammo.loaded_mag)
        else
            stack = inv:add_item("main", self.ammo.loaded_mag)
        end
        if stack:get_count() > 0 then
            local object = minetest.add_item(self.gun.pos, stack)
        end
    end
    self.ammo.loaded_mag = "empty"
    self.ammo.chambered_round = "empty"
    self.ammo.total_rounds = 0
    self.ammo.loaded_rounds = {}
    self:update_meta()
end
