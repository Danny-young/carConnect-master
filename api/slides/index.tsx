import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"

export const useSliders = () => {
    return useQuery( {
        queryKey: ['slider'],
        queryFn: async () => {
            const { data, error } = await supabase.from('sliders').select('*')
            if (error) {
                throw new Error(error?.message)               
            }
            return data;                      
        }      
    
});
};