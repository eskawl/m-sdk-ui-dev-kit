// ============================================================================
// Slice State Types
// ============================================================================

export type AuthState = {
  token: string | null
  permissions: unknown | null
}

export type NotificationState = {
  count: number
}

export type TimezoneState = {
  timezone: string
}

export type DevicesState = {
  selectedDevices: Array<{ id: string; [key: string]: unknown }>
  selectedSockets: Record<string, ContainerSockets>
  filterTags: string[]
  selectedDevicesTags: Record<string, Record<string, DeviceTag>>
  selectedContainers: Record<string, unknown>
  selectedLvCabinets: Record<string, unknown>
}

export type RootState = {
  auth: AuthState
  notifications: NotificationState
  timezone: TimezoneState
  devices: DevicesState
}
