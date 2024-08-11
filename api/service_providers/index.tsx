import { supabase } from "@/lib/supabase"
import { useMutation } from "@tanstack/react-query"

export const useInsertCompany = () => {
return useMutation({
    async mutationFn(data: any){
        const {error, data: newCompany } = await supabase 
        .from('User_Business')
        .insert({ 
              id: data.user.id,           
              business_name: data.business_name,
              coordinates: data.coordinates, 
              address: data.address,
              description: data.description,
              telephone: data.telephone,
              provider_email: data.provider_email
            })
            .select();
            
            if (error) {
                throw new Error(error.message);
            }
            return newCompany;                      
        
    },
});
};