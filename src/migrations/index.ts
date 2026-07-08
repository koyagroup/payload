import * as migration_20260419_084203_initial from './20260419_084203_initial';
import * as migration_20260708_101939_step_330_landing_blocks from './20260708_101939_step_330_landing_blocks';

export const migrations = [
  {
    up: migration_20260419_084203_initial.up,
    down: migration_20260419_084203_initial.down,
    name: '20260419_084203_initial',
  },
  {
    up: migration_20260708_101939_step_330_landing_blocks.up,
    down: migration_20260708_101939_step_330_landing_blocks.down,
    name: '20260708_101939_step_330_landing_blocks'
  },
];
