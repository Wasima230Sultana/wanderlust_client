import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  priceUsd: number;
  duration: string;
  departureDate: string;
  imageUrl?: string;
  description?: string;
};
const DeleteDestinationDialog = ({destination}: {
  destination: Destination;
}) => {
    const handleDeleteDestination = async()=>{
      const token = await getTokenFromClient()
        const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/destinations/${destination._id}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'application/json',
                authorization:`Bearer ${token}`
            },
         
        })
        await res.json()
        redirect('/destinations')
    }
    return (
       <AlertDialog>
  <AlertDialogTrigger render={<Button className={'bg-red-600 text-white'} variant="outline" />}>
    Delete
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    );
};

export default DeleteDestinationDialog;