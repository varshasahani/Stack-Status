export interface IMovie {
    id: number,
    name: string,
    releaseDate: string,
    langauge: string,
    image: string,
    description: string,
    dates: { [key: string]: Slots }
}

export interface Slots {
    slots: { [key: string]: number }
}
export interface IUser {
    id: number,
    name: string,
    email: string
}


export interface IMovieForm {
    id: number
    userId: number,
    movieId: number,
    date: string
    movieName: string,
    time: string,
    seats: number,
    price: number,
}