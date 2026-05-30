// Nivoda API Client
// Uses username/password authentication with Nivoda production endpoint

interface NivodaDiamond {
  id: string
  shape: string
  carat: number
  color: string
  clarity: string
  cut: string
  price: number
  lab_grown: boolean
  image_url?: string
  video_url?: string
  certificate_url?: string
  [key: string]: any
}

interface NivodaFilterParams {
  shape?: string
  color?: string
  clarity?: string
  cut?: string
  caratMin?: number
  caratMax?: number
  priceMin?: number
  priceMax?: number
  labGrown?: boolean
}

class NivodaClient {
  private baseUrl = 'https://integrations.nivoda.net/api/diamonds'
  private username: string
  private password: string
  private token: string | null = null
  private tokenExpiry: number | null = null

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  private async authenticate(): Promise<string> {
    try {
      console.log('[v0] Authenticating with Nivoda...')
      
      const response = await fetch('https://integrations.nivoda.net/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`)
      }

      const data = await response.json()
      this.token = data.token
      this.tokenExpiry = Date.now() + (data.expiresIn || 3600) * 1000
      
      console.log('[v0] Authentication successful')
      return this.token
    } catch (error) {
      console.error('[v0] Nivoda authentication error:', error)
      throw error
    }
  }

  private async getValidToken(): Promise<string> {
    // Check if token exists and is still valid
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token
    }

    // Otherwise, authenticate
    return this.authenticate()
  }

  async getDiamonds(filters?: NivodaFilterParams): Promise<NivodaDiamond[]> {
    try {
      const token = await this.getValidToken()

      const queryParams = new URLSearchParams()
      if (filters?.shape) queryParams.append('shape', filters.shape)
      if (filters?.color) queryParams.append('color', filters.color)
      if (filters?.clarity) queryParams.append('clarity', filters.clarity)
      if (filters?.cut) queryParams.append('cut', filters.cut)
      if (filters?.caratMin !== undefined) queryParams.append('caratMin', filters.caratMin.toString())
      if (filters?.caratMax !== undefined) queryParams.append('caratMax', filters.caratMax.toString())
      if (filters?.priceMin !== undefined) queryParams.append('priceMin', filters.priceMin.toString())
      if (filters?.priceMax !== undefined) queryParams.append('priceMax', filters.priceMax.toString())
      if (filters?.labGrown !== undefined) queryParams.append('labGrown', filters.labGrown.toString())

      const url = `${this.baseUrl}?${queryParams.toString()}`

      console.log('[v0] Fetching diamonds from Nivoda with params:', Object.fromEntries(queryParams))

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        // If unauthorized, try to re-authenticate
        if (response.status === 401) {
          this.token = null
          return this.getDiamonds(filters)
        }
        throw new Error(`Failed to fetch diamonds: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('[v0] Received diamonds from Nivoda:', data.diamonds?.length || 0, 'diamonds')
      
      return data.diamonds || []
    } catch (error) {
      console.error('[v0] Error fetching diamonds:', error)
      throw error
    }
  }

  async getDiamondById(id: string): Promise<NivodaDiamond | null> {
    try {
      const token = await this.getValidToken()

      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          this.token = null
          return this.getDiamondById(id)
        }
        if (response.status === 404) {
          return null
        }
        throw new Error(`Failed to fetch diamond: ${response.statusText}`)
      }

      const data = await response.json()
      return data.diamond || null
    } catch (error) {
      console.error('[v0] Error fetching diamond by ID:', error)
      throw error
    }
  }
}

// Singleton instance
let nivodaClient: NivodaClient | null = null

export function getNivodaClient(): NivodaClient {
  if (!nivodaClient) {
    const username = process.env.NIVODA_USERNAME
    const password = process.env.NIVODA_PASSWORD

    if (!username || !password) {
      throw new Error('NIVODA_USERNAME and NIVODA_PASSWORD environment variables are required')
    }

    nivodaClient = new NivodaClient(username, password)
  }

  return nivodaClient
}

export type { NivodaDiamond, NivodaFilterParams }
