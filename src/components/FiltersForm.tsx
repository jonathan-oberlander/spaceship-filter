import {
  Button,
  CheckIcon,
  Checkbox,
  Group,
  MultiSelect,
  NumberInput,
  Radio,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const pulseSchema = z.enum(['with', 'without', 'both'])
const schema = z.object({
  colors: z.array(z.string()).optional(),
  min_speed: z.number(),
  max_speed: z.number(),
  pulse_laser: pulseSchema,
  flip: z.boolean(),
})

const colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
  'silver',
  'black',
]

// type Colors = (typeof colors)[number]
type FilterForm = z.infer<typeof schema>
export type PulseLaser = z.infer<typeof pulseSchema>

const getValuesFromSearch = (filters: URLSearchParams): FilterForm => {
  return {
    colors: filters.get('colors')?.split(','),
    min_speed: Number.parseInt(filters.get('min_speed') ?? '0'),
    max_speed: Number.parseInt(filters.get('max_speed') ?? '200'),
    pulse_laser: filters.get('pulse_laser') as PulseLaser,
    flip: filters.get('flip') === 'true',
  }
}

export const FilterForm = () => {
  const [search] = useSearchParams()
  const navigate = useNavigate()

  const initialValues = getValuesFromSearch(search)

  const form = useForm<FilterForm>({
    name: 'filterForm',
    initialValues,
    validate: zodResolver(schema),
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: only set the form when the search changes
  useEffect(() => {
    // TODO: not ideal - review the sychronisation
    form.setValues(initialValues)
  }, [search])

  const handleSubmit = (data: FilterForm) => {
    const params = new URLSearchParams()

    Object.entries(data).map(([k, v]) => {
      params.append(k, v as string)
    })

    navigate({
      pathname: 'spaceships',
      search: params.toString(),
    })
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group p="sm" mt="lg">
          <Checkbox
            key={form.key('flip')}
            {...form.getInputProps('flip', { type: 'checkbox' })}
          />
          <MultiSelect
            label="Colors"
            placeholder="Pick colors"
            data={colors}
            key={form.key('colors')}
            {...form.getInputProps('colors')}
          />
          <NumberInput
            label="Min speed"
            placeholder="Choose a speed"
            min={50}
            max={200}
            defaultValue={0}
            key={form.key('min_speed')}
            {...form.getInputProps('min_speed')}
          />
          <NumberInput
            label="Max speed"
            placeholder="Choose a speed"
            min={0}
            max={200}
            defaultValue={200}
            key={form.key('max_speed')}
            {...form.getInputProps('max_speed')}
          />
          <Radio.Group
            label="Pulse Laser"
            key={form.key('pulse_laser')}
            {...form.getInputProps('pulse_laser')}
          >
            <Group mt="xs">
              <Radio icon={CheckIcon} value="both" label="both" />
              <Radio icon={CheckIcon} value="with" label="with" />
              <Radio icon={CheckIcon} value="without" label="without" />
            </Group>
          </Radio.Group>
          <Button type="submit" variant="gradient" fullWidth>
            Search
          </Button>
        </Group>
      </form>
    </>
  )
}
