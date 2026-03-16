import { Tabs, TabsContent, TabsList, TabsTrigger } from '@mining-sdk/core'
import type { ReactElement } from 'react'
import '../styles/_contaienrs-page-common.scss'
import { BitmainChartsDemo } from './charts/bitmain-charts-demo'
import { BitMainHydroSettingsDemo } from './settings/bitmain-settings-demo'
import { BitmainStatusItemDemo } from './status/bitmain-status-item-demo'

/**
 * Bitmain Container Demo Page
 *
 * Main demo page with tabs for Bitmain Settings, Cooling System, and Charts
 */
export const BitmainPage = (): ReactElement => {
  return (
    <div className="explorer-containers-page">
      <header className="explorer-containers-page__header">
        <h1>Bitmain Container Components</h1>
        <p>Interactive demonstrations of container management and monitoring components</p>
      </header>

      <Tabs defaultValue="settings" className="explorer-containers-page__tabs">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <BitMainHydroSettingsDemo />
        </TabsContent>

        <TabsContent value="charts">
          <BitmainChartsDemo />
        </TabsContent>

        <TabsContent value="status">
          <BitmainStatusItemDemo />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default BitmainPage
