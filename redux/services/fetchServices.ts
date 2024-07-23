import { axiosInstance } from "data/axiosInstance"
import { FetchState } from "redux/types/stateTypes"

interface ApiRes<T> {
  data: T,
  status: number,
  statusText: string
}

export const fetchData = async(): Promise<FetchState[]> => {
  try {
    const res: ApiRes<FetchState[]> = await axiosInstance.get('/fact')

    return res.data
  } catch ( err ) {
    console.error('Error: ', err)

    throw err
  }
}