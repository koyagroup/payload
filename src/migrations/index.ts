import * as migration_20260419_084203_initial from './20260419_084203_initial';
import * as migration_20260708_101939_step_330_landing_blocks from './20260708_101939_step_330_landing_blocks';
import * as migration_20260709_130946_how_it_works_step_image from './20260709_130946_how_it_works_step_image';
import * as migration_20260709_150000_step_334_localization from './20260709_150000_step_334_localization';
import * as migration_20260710_000000_step_336_cookie_consent from './20260710_000000_step_336_cookie_consent';

export const migrations = [
  {
    up: migration_20260419_084203_initial.up,
    down: migration_20260419_084203_initial.down,
    name: '20260419_084203_initial',
  },
  {
    up: migration_20260708_101939_step_330_landing_blocks.up,
    down: migration_20260708_101939_step_330_landing_blocks.down,
    name: '20260708_101939_step_330_landing_blocks',
  },
  {
    up: migration_20260709_130946_how_it_works_step_image.up,
    down: migration_20260709_130946_how_it_works_step_image.down,
    name: '20260709_130946_how_it_works_step_image'
  },
  {
    up: migration_20260709_150000_step_334_localization.up,
    down: migration_20260709_150000_step_334_localization.down,
    name: '20260709_150000_step_334_localization',
  },
  {
    up: migration_20260710_000000_step_336_cookie_consent.up,
    down: migration_20260710_000000_step_336_cookie_consent.down,
    name: '20260710_000000_step_336_cookie_consent',
  },
];
