import { Tabs, TabsContent, TabsList, TabsTrigger } from '@mdk/core'
import type { ReactElement } from 'react'
import '../styles/_contaienrs-page-common.scss'
import { GaugeChartComponentDemo } from './chart/gauge-chart-component-demo'
import { MicroBTCoolingDemo } from './cooling/micro-bt-cooling-demo'
import { PowerMetersDemo } from './power-meters/power-meters-demo'
import { MicroBTSettingsDemo } from './settings/micro-bt-settings-demo'
/**
 * Micro BT Container Demo Page
 *
 */
export const MicroBTPage = (): ReactElement => {
  return (
    <div className="explorer-containers-page">
      <header className="explorer-containers-page__header">
        <h1>Micro BT Container Components</h1>
        <p>Interactive demonstrations of container management and monitoring components</p>
      </header>

      <Tabs defaultValue="settings" className="explorer-containers-page__tabs">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="cooling">Cooling</TabsTrigger>
          <TabsTrigger value="power-meters">Power Meters</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <MicroBTSettingsDemo />
        </TabsContent>
        <TabsContent value="charts">
          <GaugeChartComponentDemo />
        </TabsContent>
        <TabsContent value="cooling">
          <MicroBTCoolingDemo />
        </TabsContent>
        <TabsContent value="power-meters">
          <PowerMetersDemo />
        </TabsContent>
      </Tabs>
    </div>
  )
}
