import { Tabs, TabsContent, TabsList, TabsTrigger } from '@mdk/core'
import type { ReactElement } from 'react'

import '../styles/_contaienrs-page-common.scss'
import BitdeerChartsDemo from './charts/bitdeer-charts-demo'
import { BitdeerOptionsDemo } from './home/bitdeer-options-demo'
import { BitdeerSettingsPage } from './settings/bitdeer-settings-page'

/**
 * Bitdeer Container Demo Page
 *
 * Main demo page with tabs for Bitdeer Settings and Dry Cooler components
 */
export const BitdeerPage = (): ReactElement => {
  return (
    <div className="explorer-containers">
      <header className="explorer-containers-page__header">
        <h1>Bitdeer Container Components</h1>
        <p>Interactive demonstrations of container management components</p>
      </header>

      <Tabs defaultValue="settings" className="explorer-containers-page__tabs">
        <TabsList>
          <TabsTrigger value="settings">Container Settings</TabsTrigger>
          <TabsTrigger value="cooling">Cooling System</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <BitdeerSettingsPage />
        </TabsContent>

        <TabsContent value="cooling">
          <BitdeerOptionsDemo />
        </TabsContent>
        <TabsContent value="charts">
          <BitdeerChartsDemo />
        </TabsContent>
      </Tabs>
    </div>
  )
}
