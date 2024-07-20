import { Host } from '../entities'

export interface HostGateway {
  getAll(): Promise<Host[]>
  // getById(id: string): Promise<Host>
  // create(host: Host): Promise<Host>
  // update(host: Host): Promise<Host>
  // delete(id: string): Promise<void>
}
