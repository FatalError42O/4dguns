var docs = [
{path:"class/Gun.html", type:"class", title:"Gun.Gun", text:"Gun class Defining a gun: *method documentation coming soon* (or never...) guns are defined by two table fields: their consts and their properties. properties define nearly everything, from how a gun handles to how it looks, what model it uses, while consts define attributes that should never change, like bones within the gun, framerates, wether the gun is allowed to have certain attributes at all. The rest is mainly for internal workings of the mod. Guns4d uses a class system for most moving parts- including the gun. New guns therefore are created with the :inherit(def) method, where def is the definition of your new gun- or rather the changed parts of it. So to make a new gun you can run Guns4d.gun:inherit() or you can do the same thing with a seperate class of weapons. Set name to \"__template\" for template classes of guns."},
{path:"class/player_model_handler.html", type:"class", title:"Player_model_handler.player_model_handler", text:"player_model_handler defining the player model when holding a gun each player model should have a \"gun holding equivelant\". There are numerous reasons for this first and foremost is that because Minetest is a [redacted mindless insults]. because of this you cannot unset bone offsets and return to normal animations. Bone offsets are needed for the arms to aim at the gun there's no simple way around this fact. Since every model is different custom behavior has to be defined for most."},
{path:"module/misc_helpers.html", type:"module", title:"misc_helpers", text:""},
{path:"module/play_sound.html", type:"module", title:"play_sound", text:"implements tools for quickly playing audio."},
{path:"module/Bullet_hole.html", type:"module", title:"Bullet_hole", text:""},
{path:"module/Control_handler.html", type:"module", title:"Control_handler", text:""},
{path:"module/Gun-methods.html", type:"module", title:"Gun-methods", text:""},
{path:"module/play_sound.html#guns4d_soundspec.min_hear_distance", type:"field", title:"guns4d_soundspec.min_hear_distance", text:"float this is useful if you wish to play a sound which has a \"far\" sound, such as distant gunshots. incompatible with to_player"},
{path:"module/play_sound.html#guns4d_soundspec.sounds", type:"field", title:"guns4d_soundspec.sounds", text:"table a weighted_randoms table for randomly selecting sounds. The output will overwrite the sound field."},
{path:"module/play_sound.html#guns4d_soundspec.to_player", type:"field", title:"guns4d_soundspec.to_player", text:"objRef 4dguns changes to_player so it only plays positionless audio (as it is only intended for first person audio). If set to string \"from_player\" and player present"},
{path:"module/play_sound.html#guns4d_soundspec.player", type:"field", title:"guns4d_soundspec.player", text:"objRef this is so to_player being set to \"from_player\". It's to be set to the player which fired the weapon."},
{path:"module/play_sound.html#guns4d_soundspec.delay", type:"field", title:"guns4d_soundspec.delay", text:"float delays the playing of the sound"},
{path:"module/play_sound.html#guns4d_soundspec.attenuation_rate", type:"field", title:"guns4d_soundspec.attenuation_rate", text:"float the rate of dropoff for a sound. I figure this is a bit more intuitive then jacking the gain up super high for every sound... Set the default in config."},
{path:"module/play_sound.html#guns4d_soundspec.split_audio_by_perspective", type:"field", title:"guns4d_soundspec.split_audio_by_perspective", text:"bool [GUN CLASS SPECIFIC] tells the gun wether to split into third and first person (positionless) audio and adjust gain."},
{path:"module/play_sound.html#guns4d_soundspec.third_person_gain_multiplier", type:"field", title:"guns4d_soundspec.third_person_gain_multiplier", text:"float [GUN CLASS SPECIFIC] replaces the constant/config value \"third_person_gain_multiplier/THIRD_PERSON_GAIN_MULTIPLIER\"."},
{path:"class/Gun.html#gun.properties", type:"field", title:"gun.properties", text:"properties which define the vast majority of gun attributes and may change accross instances"},
{path:"class/Gun.html#gun.consts", type:"field", title:"gun.consts", text:"constants which define gun attributes and should not be changed in an instance of the gun"},
{path:"class/Gun.html#gun.offsets", type:"field", title:"gun.offsets", text:"runtime storage of offsets generated by recoil sway wag or any other element."},
{path:"class/Gun.html#gun.name", type:"field", title:"gun.name", text:"string the name of the gun. Set to __template for guns which have no instances."},
{path:"class/Gun.html#gun.itemstack", type:"field", title:"gun.itemstack", text:"ItemStack the gun itemstack. Remember to player:set_wielded_item(self.itemstack) when making meta or itemstack changes."},
{path:"class/Gun.html#gun.meta", type:"field", title:"gun.meta", text:"MetaDataRef itemstack meta"},
{path:"class/Gun.html#gun.id", type:"field", title:"gun.id", text:"string the ID of the gun used for tracking of it's inventory"},
{path:"class/Gun.html#gun.gun_entity", type:"field", title:"gun.gun_entity", text:"ObjRef the gun entity"},
{path:"class/Gun.html#gun.inventory_image_magless", type:"field", title:"gun.inventory_image_magless", text:"string inventory image for when the gun has no magazine"},
{path:"class/Gun.html#gun.inventory_image", type:"field", title:"gun.inventory_image", text:"string inventory image for when the gun is loaded. This is added automatically during construction."},
{path:"class/Gun.html#gun.itemstring", type:"field", title:"gun.itemstring", text:"string the itemstring of the gun- i.e. \"guns4d_pack_1:m4\". Set to \"\" for __template guns."},
{path:"class/Gun.html#gun._registered", type:"field", title:"gun._registered", text:"list of registered guns, *DO NOT MODIFY* I really need a metatable for this class..."},
{path:"class/Gun.html#gun.bolt_charged", type:"field", title:"gun.bolt_charged", text:"bool is the bolt charged"},
{path:"class/Gun.html#gun.particle_spawners", type:"field", title:"gun.particle_spawners", text:"table list of particle spawner handles (generated by firing)"},
{path:"class/Gun.html#gun.current_firemode", type:"field", title:"gun.current_firemode", text:"int the active index of the firemode from lvl1_fields.properties.firemodes"},
{path:"class/Gun.html#gun.walking_tick", type:"field", title:"gun.walking_tick", text:"float walking time used to generate the figure 8 for wag"},
{path:"class/Gun.html#gun.time_since_last_fire", type:"field", title:"gun.time_since_last_fire", text:"float"},
{path:"class/Gun.html#gun.time_since_creation", type:"field", title:"gun.time_since_creation", text:"float"},
{path:"class/Gun.html#gun.rechamber_time", type:"field", title:"gun.rechamber_time", text:"float time left for the chamber to cycle (for firerates)"},
{path:"class/Gun.html#gun.burst_queue", type:"field", title:"gun.burst_queue", text:"int number of rounds left that need to be fired after a burst fire"},
{path:"class/Gun.html#gun.muzzle_flash", type:"field", title:"gun.muzzle_flash", text:"function"},
{path:"class/Gun.html#gun.gun_translation", type:"field", title:"gun.gun_translation", text:"vec3 translation of the gun relative to the \"gun\" bone or the player axial rotation."},
{path:"class/Gun.html#gun.property_modifiers", type:"field", title:"gun.property_modifiers", text:"table indexed list of modifiers not set by the gun but to be applied to the gun. After changing, gun:update_modifiers() must be called to update it. Also may contain lists of modifiers."},
{path:"class/Gun.html#lvl1_fields.properties.hip", type:"field", title:"lvl1_fields.properties.hip", text:"table hipfire properties"},
{path:"class/Gun.html#lvl1_fields.properties.ads", type:"field", title:"lvl1_fields.properties.ads", text:"table aiming (\"aiming down sights\") properties"},
{path:"class/Gun.html#lvl1_fields.properties.firemodes", type:"field", title:"lvl1_fields.properties.firemodes", text:"table list of firemodes"},
{path:"class/Gun.html#lvl1_fields.properties.firemode_inventory_overlays", type:"field", title:"lvl1_fields.properties.firemode_inventory_overlays", text:"table list of corresponding images for firemodes"},
{path:"class/Gun.html#lvl1_fields.properties.recoil", type:"field", title:"lvl1_fields.properties.recoil", text:"table defines the guns recoil"},
{path:"class/Gun.html#lvl1_fields.properties.sway", type:"field", title:"lvl1_fields.properties.sway", text:"table defines the guns idle sway"},
{path:"class/Gun.html#lvl1_fields.properties.wag", type:"field", title:"lvl1_fields.properties.wag", text:"table defines the movement of the gun while walking"},
{path:"class/Gun.html#lvl1_fields.properties.charging", type:"field", title:"lvl1_fields.properties.charging", text:"table defines how rounds are chambered into the gun"},
{path:"class/Gun.html#lvl1_fields.properties.ammo", type:"field", title:"lvl1_fields.properties.ammo", text:"defines what ammo the gun uses"},
{path:"class/Gun.html#lvl1_fields.properties.visuals", type:"field", title:"lvl1_fields.properties.visuals", text:"defines visual attributes of the gun"},
{path:"class/Gun.html#lvl1_fields.properties.breathing_scale", type:"field", title:"lvl1_fields.properties.breathing_scale", text:"float=.5 max angular deviation (vertical) from breathing"},
{path:"class/Gun.html#lvl1_fields.properties.flash_offset", type:"field", title:"lvl1_fields.properties.flash_offset", text:"vector the offset from the center of the muzzle flash. Used by fire()"},
{path:"class/Gun.html#lvl1_fields.properties.firerateRPM", type:"field", title:"lvl1_fields.properties.firerateRPM", text:"int=600 The number of rounds (cartidges) this gun can throw per minute. Used by update(), fire() and default controls"},
{path:"class/Gun.html#lvl1_fields.properties.collisionbox", type:"field", title:"lvl1_fields.properties.collisionbox", text:"the item entity's attributes. [DOCUMENTATION NEEDED] [[item = {"},
{path:"class/Gun.html#gun.properties.hip.offset", type:"field", title:"gun.properties.hip.offset", text:"vector the offset of the gun (relative to the right arm's default position) at hip."},
{path:"class/Gun.html#gun.properties.hip.axis_rotation_ratio", type:"field", title:"gun.properties.hip.axis_rotation_ratio", text:"the ratio that the look rotation is expressed through player_axial (rotated around the viewport) rotation as opposed to gun_axial (rotating the entity)."},
{path:"class/Gun.html#gun.properties.hip.sway_vel_mul", type:"field", title:"gun.properties.hip.sway_vel_mul", text:"sway speed multiplier while at hip"},
{path:"class/Gun.html#gun.properties.hip.sway_angle_mul", type:"field", title:"gun.properties.hip.sway_angle_mul", text:"sway angle multiplier while at hip+"},
{path:"class/Gun.html#gun.properties.ads.offset", type:"field", title:"gun.properties.ads.offset", text:"vector the offset of the gun relative to the eye's position at hip."},
{path:"class/Gun.html#gun.properties.ads.horizontal_offset", type:"field", title:"gun.properties.ads.horizontal_offset", text:"float the horizontal offset of the eye when aiming"},
{path:"class/Gun.html#gun.properties.ads.aim_time", type:"field", title:"gun.properties.ads.aim_time", text:"the time it takes to go into full aim"},
{path:"class/Gun.html#gun.burst", type:"field", title:"gun.burst", text:"int=3 how many rounds in burst using when firemode is at \"burst\""},
{path:"class/Gun.html#gun.properties.firemodes."single"", type:"field", title:"gun.properties.firemodes.\"single\"", text:""},
{path:"class/Gun.html#gun.properties.firemodes."burst"", type:"field", title:"gun.properties.firemodes.\"burst\"", text:""},
{path:"class/Gun.html#gun.properties.firemodes."auto"", type:"field", title:"gun.properties.firemodes.\"auto\"", text:""},
{path:"class/Gun.html#gun.infinite_inventory_overlay", type:"field", title:"gun.infinite_inventory_overlay", text:"string overlay on the item to use when infinite ammo is on"},
{path:"class/Gun.html#gun.properties.firemode_inventory_overlays.single", type:"field", title:"gun.properties.firemode_inventory_overlays.single", text:"\"inventory_overlay_single.png\""},
{path:"class/Gun.html#gun.properties.firemode_inventory_overlays.auto", type:"field", title:"gun.properties.firemode_inventory_overlays.auto", text:"\"inventory_overlay_auto.png\""},
{path:"class/Gun.html#gun.properties.firemode_inventory_overlays.burst", type:"field", title:"gun.properties.firemode_inventory_overlays.burst", text:"\"inventory_overlay_burst.png\""},
{path:"class/Gun.html#gun.properties.firemode_inventory_overlays.safe", type:"field", title:"gun.properties.firemode_inventory_overlays.safe", text:"\"inventory_overlay_safe.png\" (unimplemented firemode)"},
{path:"class/Gun.html#gun.properties.recoil.velocity_correction_factor", type:"field", title:"gun.properties.recoil.velocity_correction_factor", text:"float TL:DR higher decreases recoil at expense of smoothness. 1/value is the deviation of a normalized bell curve, where x is the time since firing. this means that increasing it decreases the time it takes for the angular velocity to fully \"decay\"."},
{path:"class/Gun.html#gun.properties.recoil.target_correction_factor", type:"field", title:"gun.properties.recoil.target_correction_factor", text:"float Correction of recoil offset per second is calculated as such: target_correction_factor[axis]time_since_firerecoil[axis]"},
{path:"class/Gun.html#gun.properties.recoil.target_correction_max_rate", type:"field", title:"gun.properties.recoil.target_correction_max_rate", text:"float The maximum rate per second of recoil offset as determined with target_correction_factor"},
{path:"class/Gun.html#gun.properties.recoil.angular_velocity_max", type:"field", title:"gun.properties.recoil.angular_velocity_max", text:"float caps the recoil velocity that can stack up from shots."},
{path:"class/Gun.html#gun.properties.recoil.angular_velocity", type:"field", title:"gun.properties.recoil.angular_velocity", text:"vector {x=float, y=float}, defines the initial angular velocity produced by firing the gun"},
{path:"class/Gun.html#gun.properties.recoil.bias", type:"field", title:"gun.properties.recoil.bias", text:"vector {x=float, y=float}, ranges -1 to 1. Defines the probability of the recoil being positive or negative for any given axis."},
{path:"class/Gun.html#gun.properties.recoil.hipfire_multiplier", type:"field", title:"gun.properties.recoil.hipfire_multiplier", text:"float angular velocity multiplier when firing from the hip"},
{path:"class/Gun.html#gun.properties.sway.max_angle", type:"field", title:"gun.properties.sway.max_angle", text:"float maximum angle of the sway"},
{path:"class/Gun.html#gun.properties.sway.angular_velocity", type:"field", title:"gun.properties.sway.angular_velocity", text:"float angular velocity the sway"},
{path:"class/Gun.html#gun.properties.sway.hipfire_angle_multiplier", type:"field", title:"gun.properties.sway.hipfire_angle_multiplier", text:"float maximum angle multiplier while the gun is at the hip"},
{path:"class/Gun.html#gun.properties.sway.hipfire_velocity_multiplier", type:"field", title:"gun.properties.sway.hipfire_velocity_multiplier", text:"float velocity multiplier while the gun is at the hip"},
{path:"class/Gun.html#gun.properties.wag.cycle_speed", type:"field", title:"gun.properties.wag.cycle_speed", text:"float=1.6 the cycle speed multiplier"},
{path:"class/Gun.html#gun.properties.wag.decay_speed", type:"field", title:"gun.properties.wag.decay_speed", text:"float=1 decay factor when walking has stopped and offset remains."},
{path:"class/Gun.html#gun.properties.wag.offset", type:"field", title:"gun.properties.wag.offset", text:"table containing angular deviation while walking in the same format as an offset vector. Acts as a multiplier on the figure-8 generated while walking."},
{path:"class/Gun.html#gun.pc_control_actions", type:"field", title:"gun.pc_control_actions", text:"table containing a list of actions for PC users passed to Control_handler"},
{path:"class/Gun.html#gun.touch_control_actions", type:"field", title:"gun.touch_control_actions", text:"table containing a list of actions for touch screen users passed to Control_handler"},
{path:"class/Gun.html#gun.properties.charging.require_draw_on_swap", type:"field", title:"gun.properties.charging.require_draw_on_swap", text:"bool defines wether the draw animation is played on swap (when loaded). Used in the instance construction method"},
{path:"class/Gun.html#gun.properties.charging.bolt_charge_mode", type:"field", title:"gun.properties.charging.bolt_charge_mode", text:"string \"none\" bolt will never need to be charged after reload, \"catch\" when fired to empty bolt will not need to be charged after reload, \"no_catch\" bolt will always need to be charged after reload."},
{path:"class/Gun.html#gun.properties.charging.draw_time", type:"field", title:"gun.properties.charging.draw_time", text:"float the time it takes to swap to the gun"},
{path:"class/Gun.html#gun.properties.charging.draw_animation", type:"field", title:"gun.properties.charging.draw_animation", text:"string name of the animation to play from visuals.animations"},
{path:"class/Gun.html#gun.properties.charging.draw_sound", type:"field", title:"gun.properties.charging.draw_sound", text:"string name of the sound to play from sounds"},
{path:"class/Gun.html#Gun.reload", type:"field", title:"Gun.reload", text:"and ordered list of reloading states used by default_controls. the default reload states for a magazine operated weapon, copied from the m4. Example"},
{path:"class/Gun.html#gun.properties.ammo.accepted_bullets", type:"field", title:"gun.properties.ammo.accepted_bullets", text:"table a list of accepted bullet itemstrings"},
{path:"class/Gun.html#gun.properties.ammo.accepted_magazines", type:"field", title:"gun.properties.ammo.accepted_magazines", text:"table a list of accepted magazine itemstrings"},
{path:"class/Gun.html#gun.properties.ammo.initial_mag", type:"field", title:"gun.properties.ammo.initial_mag", text:"string the mag the gun starts with. Set to \"empty\" for no mag, otherwise it defaults to accepted_magazines[1] (if present)"},
{path:"class/Gun.html#gun.properties.visuals.mesh", type:"field", title:"gun.properties.visuals.mesh", text:"name of mesh to display"},
{path:"class/Gun.html#gun.properties.visuals.textures", type:"field", title:"gun.properties.visuals.textures", text:"list of textures to use"},
{path:"class/Gun.html#gun.properties.visuals.scale", type:"field", title:"gun.properties.visuals.scale", text:"scale multiplier"},
{path:"class/Gun.html#gun.properties.visuals.backface_culling", type:"field", title:"gun.properties.visuals.backface_culling", text:"toggles backface culling"},
{path:"class/Gun.html#gun.properties.visuals.animations", type:"field", title:"gun.properties.visuals.animations", text:"a table of animations in the format {x=int, y=float}. Indexes define the name of the animation to be refrenced by other functions of the gun."},
{path:"class/Gun.html#Gun.model_bounding_box", type:"field", title:"Gun.model_bounding_box", text:"a table {x1,y1,z1,x2,y2,z2} specifying the bounding box of the model. The first 3 (x1,y1,z1) are the lower of their counterparts"},
{path:"class/Gun.html#Gun.sounds", type:"field", title:"Gun.sounds", text:"a table of soundspecs to be referenced by other functions"},
{path:"class/Gun.html#lvl1_fields.offsets.recoil", type:"field", title:"lvl1_fields.offsets.recoil", text:""},
{path:"class/Gun.html#lvl1_fields.offsets.sway", type:"field", title:"lvl1_fields.offsets.sway", text:""},
{path:"class/Gun.html#lvl1_fields.offsets.walking", type:"field", title:"lvl1_fields.offsets.walking", text:""},
{path:"class/Gun.html#lvl1_fields.offsets.breathing", type:"field", title:"lvl1_fields.offsets.breathing", text:""},
{path:"class/Gun.html#lvl1_fields.offsets.look", type:"field", title:"lvl1_fields.offsets.look", text:""},
{path:"class/Gun.html#Gun.animation_rotation", type:"field", title:"Gun.animation_rotation", text:"vector containing the offset from animations, this will be generated if {@consts.ANIMATIONS_OFFSET_AIM}=true"},
{path:"class/Gun.html#Gun.gun_axial", type:"field", title:"Gun.gun_axial", text:"total offsets of the gun in the same format as a an offset [[total_offsets = {"},
{path:"class/Gun.html#lvl1_fields.consts.KEYFRAME_SAMPLE_PRECISION", type:"field", title:"lvl1_fields.consts.KEYFRAME_SAMPLE_PRECISION", text:"frequency of keyframe samples for animation offsets and"},
{path:"class/Gun.html#lvl1_fields.consts.DEFAULT_MAX_HEAR_DISTANCE", type:"field", title:"lvl1_fields.consts.DEFAULT_MAX_HEAR_DISTANCE", text:"default max hear distance when not specified"},
{path:"class/Gun.html#lvl1_fields.consts.DEFAULT_FPS", type:"field", title:"lvl1_fields.consts.DEFAULT_FPS", text:"fps=60 animation fps i.e. during firing when no length is specified"},
{path:"class/Gun.html#lvl1_fields.consts.HAS_RECOIL", type:"field", title:"lvl1_fields.consts.HAS_RECOIL", text:"bool"},
{path:"class/Gun.html#lvl1_fields.consts.HAS_BREATHING", type:"field", title:"lvl1_fields.consts.HAS_BREATHING", text:"bool"},
{path:"class/Gun.html#lvl1_fields.consts.HAS_SWAY", type:"field", title:"lvl1_fields.consts.HAS_SWAY", text:"bool"},
{path:"class/Gun.html#lvl1_fields.consts.HAS_WAG", type:"field", title:"lvl1_fields.consts.HAS_WAG", text:"bool"},
{path:"class/Gun.html#lvl1_fields.consts.HAS_GUN_AXIAL_OFFSETS", type:"field", title:"lvl1_fields.consts.HAS_GUN_AXIAL_OFFSETS", text:"bool wether the gun rotates on it's own axis instead of the player's view (i.e. ironsight misalignments)"},
{path:"class/Gun.html#lvl1_fields.consts.ANIMATIONS_OFFSET_AIM", type:"field", title:"lvl1_fields.consts.ANIMATIONS_OFFSET_AIM", text:"wether animations create an offset"},
{path:"class/Gun.html#lvl1_fields.consts.LOOP_IDLE_ANIM", type:"field", title:"lvl1_fields.consts.LOOP_IDLE_ANIM", text:"whether the idle animation changes or not"},
{path:"class/Gun.html#lvl1_fields.consts.THIRD_PERSON_GAIN_MULTIPLIER", type:"field", title:"lvl1_fields.consts.THIRD_PERSON_GAIN_MULTIPLIER", text:"general gain multiplier for third persons when hearing sounds"},
{path:"class/Gun.html#lvl1_fields.consts.ROOT_BONE", type:"field", title:"lvl1_fields.consts.ROOT_BONE", text:"the root bone of the gun (for animation offsets)"},
{path:"class/Gun.html#lvl1_fields.consts.MAG_BONE", type:"field", title:"lvl1_fields.consts.MAG_BONE", text:"string=\"magazine\",the bone of the magazine in the gun (for dropping mags)"},
{path:"class/Gun.html#lvl1_fields.consts.ARM_RIGHT_BONE", type:"field", title:"lvl1_fields.consts.ARM_RIGHT_BONE", text:"string=\"right_aimpoint\", the bone which the right arm aims at to"},
{path:"class/Gun.html#lvl1_fields.consts.ARM_LEFT_BONE", type:"field", title:"lvl1_fields.consts.ARM_LEFT_BONE", text:"string=\"left_aimpoint\", the bone which the left arm aims at to"},
{path:"class/player_model_handler.html#fields.offsets", type:"field", title:"fields.offsets", text:"fields.offsets"},
{path:"module/misc_helpers.html#Guns4d.math.weighted_randoms", type:"function", title:"Guns4d.math.weighted_randoms", text:"picks a random index, with odds based on it's value. Returns the index of the selected."},
{path:"module/play_sound.html#Guns4d.play_sounds", type:"function", title:"Guns4d.play_sounds", text:"allows you to play one or more sounds with more complex features, so sounds can be easily coded for guns without the need for functions. WARNING: this function modifies the tables passed to it, use Guns4d.table.shallow_copy() or table.copy for inputted soundspecs Example"},
{path:"module/play_sound.html#Guns4d.get_sounds", type:"function", title:"Guns4d.get_sounds", text:"gets a list of currently playing Minetest sound handles from the Guns4d sound handle. Modification of table highly discouraged."},
{path:"module/play_sound.html#Guns4d.stop_sounds", type:"function", title:"Guns4d.stop_sounds", text:"stops a list of sounds"},
{path:"module/Bullet_hole.html#Bullet_hole.construct", type:"function", title:"Bullet_hole.construct", text:""},
{path:"module/Control_handler.html#controls.toggle_touchscreen_mode", type:"function", title:"controls:toggle_touchscreen_mode", text:""},
{path:"module/Gun-methods.html#gun_default.update", type:"function", title:"gun_default:update", text:"The entry method for the update of the gun calls virtually all functions that begin with update once. Also updates subclass"},
{path:"module/Gun-methods.html#gun_default.update_burstfire", type:"function", title:"gun_default:update_burstfire", text:"Update and fire the queued weapon burst"},
{path:"module/Gun-methods.html#gun_default.cycle_firemodes", type:"function", title:"gun_default:cycle_firemodes", text:"cycles to the next firemode of the weapon"},
{path:"module/Gun-methods.html#gun_default.update_image_and_text_meta", type:"function", title:"gun_default:update_image_and_text_meta", text:"update the inventory information of the gun"},
{path:"module/Gun-methods.html#gun_default.attempt_fire", type:"function", title:"gun_default:attempt_fire", text:"attempt to fire the gun"},
{path:"module/Gun-methods.html#gun_default.recoil", type:"function", title:"gun_default:recoil", text:"simulate recoil by adding to the recoil velocity (called by attempt_fire)"},
{path:"module/Gun-methods.html#gun_default.update_look_offsets", type:"function", title:"gun_default:update_look_offsets", text:"update the offsets of the player's look created by the gun"},
{path:"module/Gun-methods.html#gun_default.get_pos", type:"function", title:"gun_default:get_pos", text:"get the global position of the gun. This is customized to rely on the assumption that there are 3-4 main rotations and 2-3 translations. If the behavior of the bones are changed this method may not work"},
{path:"module/Gun-methods.html#gun_default.add_entity", type:"function", title:"gun_default:add_entity", text:"adds the gun entity"},
{path:"module/Gun-methods.html#gun_default.update_entity", type:"function", title:"gun_default:update_entity", text:"updates the gun's entity"},
{path:"module/Gun-methods.html#gun_default.has_entity", type:"function", title:"gun_default:has_entity", text:"checks if the gun entity exists..."},
{path:"module/Gun-methods.html#gun_default.set_animation", type:"function", title:"gun_default:set_animation", text:"sets the gun's animation in the same format as ObjRef:set_animation() (future deprecation?)"},
{path:"module/Gun-methods.html#gun_default.clear_animation", type:"function", title:"gun_default:clear_animation", text:"clears the animation to the rest state"},
{path:"module/Gun-methods.html#gun_default.play_sounds", type:"function", title:"gun_default:play_sounds", text:"plays a list of sounds for the gun's user and thirdpersons"},
{path:"class/player_model_handler.html#player_model.construct", type:"function", title:"player_model.construct", text:""},
{path:"module/misc_helpers.html#math", type:"section", title:"math helpers", text:"in guns4d.math"},
{path:"module/misc_helpers.html#table", type:"section", title:"table helpers", text:"in guns4d.table"},
{path:"module/misc_helpers.html#other", type:"section", title:"other helpers", text:""},
];