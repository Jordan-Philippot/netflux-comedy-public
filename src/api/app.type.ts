export interface ArtistListType {
    artists: ArtistType[]
}

export interface ArtistType {
    external_urls: string
    followers: FollowersType
    genres: string[]
    href: string
    id: string
    images: ImageObjectType[]
    name: string
    popularity: number
    type: string
    uri: string
}
  
export interface FollowersType {
    href:string
    total: number
}

export interface ImageObjectType {
    object: ImageType
}

export interface ImageType {
    height: number
    width: number
    url: string
}