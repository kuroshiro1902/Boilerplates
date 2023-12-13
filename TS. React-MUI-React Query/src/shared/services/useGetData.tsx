import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '../../environment';

const tempEnd = env.serverUrl; // Tạm thời tương tác trực tiếp với json-server

async function fetchData<T>(path: string) {
  try {
    const response = await axios.get(tempEnd + path);
    return response.data as T;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param queryKey
 * @param path Không chứa "/" ở đầu
 */
function useGetData<T>(queryKey: string[], path: string) {
  return useQuery({
    queryKey,
    queryFn: () => fetchData<T>(path),
  });
}

export default useGetData;
