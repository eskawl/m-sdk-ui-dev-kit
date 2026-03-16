import { Checkbox, Input } from '@mining-sdk/core'
import { BitMainHydroSettings } from '@mining-sdk/foundation'
import type { ReactElement } from 'react'
import { useState } from 'react'
import './bitmain-settings-demo.scss'

/**
 * Demo data preset with complete threshold data
 */
const DEMO_PRESET = {
  id: 'demo-normal',
  type: 'bitmain-hydro',
  status: 'active',
  thresholds: {
    waterTemperature: {
      criticalLow: 21,
      alarmLow: 21,
      alert: 25,
      normal: 30,
      alarmHigh: 37,
      criticalHigh: 40,
    },
    supplyLiquidPressure: {
      criticalLow: 2,
      alarmLow: 2,
      normal: 2.3,
      alarmHigh: 3.5,
      criticalHigh: 4,
    },
  },
  last: {
    snap: {
      stats: {
        distribution_box1_power_w: 50000,
        distribution_box2_power_w: 48000,
        water_temperature: 35,
        supply_liquid_pressure: 2.5,
        container_specific: {
          latitude: '37.7749',
          latitude_direction: 'N',
          longitude: '122.4194',
          longitude_direction: 'W',
          circulating_pump: true,
          circulating_pump_fault: false,
          fluid_infusion_pump: true,
          fluid_infusion_pump_fault: false,
          fan1: true,
          fan1_fault: false,
          fan2: true,
          fan2_fault: false,
          cooling_tower_fan1: true,
          cooling_tower_fan1_fault: false,
          cooling_tower_fan2: true,
          cooling_tower_fan2_fault: false,
          cooling_tower_fan3: true,
          cooling_tower_fan3_fault: false,
        },
      },
      config: {},
    },
  },
} as const

/**
 * BitMain Hydro Demo
 *
 * Interactive demonstration of BitMain Hydro container settings with thresholds
 */
export const BitMainHydroSettingsDemo = (): ReactElement => {
  const [waterTemp, setWaterTemp] = useState('35')
  const [pressure, setPressure] = useState('2.5')
  const [customPower1, setCustomPower1] = useState('50000')
  const [customPower2, setCustomPower2] = useState('48000')

  // Cooling system states
  const [circulatingPump, setCirculatingPump] = useState(true)
  const [circulatingPumpFault, setCirculatingPumpFault] = useState(false)
  const [fluidInfusionPump, setFluidInfusionPump] = useState(true)
  const [fluidInfusionPumpFault, setFluidInfusionPumpFault] = useState(false)
  const [fan1, setFan1] = useState(true)
  const [fan1Fault, setFan1Fault] = useState(false)
  const [fan2, setFan2] = useState(true)
  const [fan2Fault, setFan2Fault] = useState(false)

  const [useCustom, setUseCustom] = useState(false)

  const customDevice = {
    id: 'demo-custom',
    type: 'bitmain-hydro',
    status: 'active',
    thresholds: {
      waterTemperature: {
        criticalLow: 21,
        alarmLow: 21,
        alert: 25,
        normal: 30,
        alarmHigh: 37,
        criticalHigh: 40,
      },
      supplyLiquidPressure: {
        criticalLow: 2,
        alarmLow: 2,
        normal: 2.3,
        alarmHigh: 3.5,
        criticalHigh: 4,
      },
    },
    last: {
      snap: {
        stats: {
          distribution_box1_power_w: Number(customPower1) || 0,
          distribution_box2_power_w: Number(customPower2) || 0,
          water_temperature: Number(waterTemp) || 0,
          supply_liquid_pressure: Number(pressure) || 0,
          container_specific: {
            latitude: '37.7749',
            latitude_direction: 'N',
            longitude: '122.4194',
            longitude_direction: 'W',
            circulating_pump: circulatingPump,
            circulating_pump_fault: circulatingPumpFault,
            fluid_infusion_pump: fluidInfusionPump,
            fluid_infusion_pump_fault: fluidInfusionPumpFault,
            fan1,
            fan1_fault: fan1Fault,
            fan2,
            fan2_fault: fan2Fault,
            cooling_tower_fan1: true,
            cooling_tower_fan1_fault: false,
            cooling_tower_fan2: true,
            cooling_tower_fan2_fault: false,
            cooling_tower_fan3: true,
            cooling_tower_fan3_fault: false,
          },
        },
        config: {},
      },
    },
  }

  const currentData = useCustom ? customDevice : DEMO_PRESET

  return (
    <div className="bitmain-hydro-demo">
      <div className="bitmain-hydro-demo__controls">
        <div className="bitmain-hydro-demo__custom">
          <h3>Custom Values</h3>
          <div className="bitmain-hydro-demo__custom-grid">
            <Input
              label="Water Temperature (°C)"
              type="number"
              value={waterTemp}
              onChange={(e) => {
                setWaterTemp(e.target.value)
                setUseCustom(true)
              }}
              placeholder="35"
            />
            <Input
              label="Supply Liquid Pressure (bar)"
              type="number"
              value={pressure}
              onChange={(e) => {
                setPressure(e.target.value)
                setUseCustom(true)
              }}
              placeholder="2.5"
              step="0.1"
            />
            <Input
              label="Distribution Box #1 Power (W)"
              type="number"
              value={customPower1}
              onChange={(e) => {
                setCustomPower1(e.target.value)
                setUseCustom(true)
              }}
              placeholder="50000"
            />
            <Input
              label="Distribution Box #2 Power (W)"
              type="number"
              value={customPower2}
              onChange={(e) => {
                setCustomPower2(e.target.value)
                setUseCustom(true)
              }}
              placeholder="48000"
            />
          </div>

          <h3 style={{ marginTop: '2rem' }}>Cooling System</h3>
          <div className="bitmain-hydro-demo__cooling-grid">
            {[
              {
                name: 'Circulating Pump',
                state: circulatingPump,
                setState: setCirculatingPump,
                fault: circulatingPumpFault,
                setFault: setCirculatingPumpFault,
              },
              {
                name: 'Fluid Infusion Pump',
                state: fluidInfusionPump,
                setState: setFluidInfusionPump,
                fault: fluidInfusionPumpFault,
                setFault: setFluidInfusionPumpFault,
              },
              {
                name: 'Fan #1',
                state: fan1,
                setState: setFan1,
                fault: fan1Fault,
                setFault: setFan1Fault,
              },
              {
                name: 'Fan #2',
                state: fan2,
                setState: setFan2,
                fault: fan2Fault,
                setFault: setFan2Fault,
              },
            ].map(({ name, state, setState, fault, setFault }) => (
              <div key={name} className="bitmain-hydro-demo__device-control">
                <h4>{name}</h4>
                <div className="bitmain-hydro-demo__checkbox-group">
                  <label className="bitmain-hydro-demo__checkbox-label">
                    <Checkbox
                      checked={state}
                      onCheckedChange={(checked) => {
                        setState(checked === true)
                        setUseCustom(true)
                      }}
                    />
                    <span>Running</span>
                  </label>
                  <label className="bitmain-hydro-demo__checkbox-label">
                    <Checkbox
                      checked={fault}
                      onCheckedChange={(checked) => {
                        setFault(checked === true)
                        setUseCustom(true)
                      }}
                    />
                    <span>Fault</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bitmain-hydro-demo__preview">
        <h3>Live Preview</h3>
        <BitMainHydroSettings data={currentData} />
      </div>
    </div>
  )
}
