import * as migration_20260419_084203_initial from './20260419_084203_initial';

export const migrations = [
  {
    up: migration_20260419_084203_initial.up,
    down: migration_20260419_084203_initial.down,
    name: '20260419_084203_initial'
  },
];
