import { FillableProperties } from '@/types/api'

export default class Service {
  protected fillable: FillableProperties = {}

  get fillableProperties() {
    return this.fillable
  }
}
