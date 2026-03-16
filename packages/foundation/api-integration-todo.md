# API Integration TODO

## Hooks to Update

### useContainerThresholds

- [ ] Replace `MOCK_SITE_DATA` with `useGetSiteQuery()`
- [ ] Replace `MOCK_CONTAINER_SETTINGS` with `useGetContainerSettingsQuery()`
- [ ] Replace `mockSetContainerSettings` with `useSetContainerSettingsMutation()`
- [ ] Update `isSiteLoading` to use real query state
- [ ] Update `isSettingsLoading` to use real query state

## API Hooks Needed

```typescript
// From @/app/services/api
import {
  useGetSiteQuery,
  useGetContainerSettingsQuery,
  useSetContainerSettingsMutation,
} from '@/app/services/api'
```
