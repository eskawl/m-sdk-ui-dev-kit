export const CONTAINER_STATUS = {
  RUNNING: 'running',
  OFFLINE: 'offline',
  STOPPED: 'stopped',
} as const

export const MINER_POWER_MODE = {
  SLEEP: 'sleep',
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
} as const

export const THRESHOLD_LEVEL = {
  CRITICAL_LOW: 'criticalLow',
  ALARM_LOW: 'alarmLow',
  ALERT: 'alert',
  NORMAL: 'normal',
  ALARM: 'alarm',
  ALARM_HIGH: 'alarmHigh',
  CRITICAL_HIGH: 'criticalHigh',
} as const
