import { Host, IHostStep } from '@core/domains/entities'
import { HostGateway } from '@core/domains/gateways'
import { PrismaAdapter } from '@core/infra/adapters'

export class PrismaHostRepository extends PrismaAdapter implements HostGateway {
  // Get all hosts
  async getAll(): Promise<Host[]> {
    const hosts: Host[] = []
    const prismaHosts = await this.prismaAdapter.host.findMany({
      include: {
        images: true,
        location: true,
        services: true
      }
    })

    prismaHosts.forEach(host => {
      const { id: _serviceId, ...services } = host.services
      const { id: _locationId, ...location } = host.location
      const images = host.images.map(image => ({ url: image.url, hostId: host.id }))

      hosts.push(
        new Host({
          id: host.id ?? '',
          step: (host.step as IHostStep) || undefined,
          categoryId: host.categoryId,
          userId: host.userId,
          title: host.title,
          description: host.description || undefined,
          bathrooms: host.bathrooms,
          bedrooms: host.bedrooms,
          services: { ...services, hostId: host.id },
          guests: host.guests,
          babies: host.babies || undefined,
          createdAt: host.createdAt,
          images,
          location: {
            ...location,
            zipCode: location.zipCode || undefined
          },
          pricePerNight: host.pricePerNight,
          currency: host.currency || undefined,
          cleaningFee: host.cleaningFee || undefined
        })
      )
    })

    return hosts
  }
}
