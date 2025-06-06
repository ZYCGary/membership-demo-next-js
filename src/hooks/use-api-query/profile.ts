import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { UpdateProfileRequest } from '@/types/api'

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => api.profile.show(),
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => {
      return api.profile.update(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}
