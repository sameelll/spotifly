import { getSession } from 'next-auth/react';
import Center from '../components/Center';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex"> 
        <Sidebar /> 
        <Center />
      </main>

      <div>
        
      </div>
    </div>
  );
}
// In the first initialize, default playlist was not seen. 
// In order to fix this issue, this function works before 
export async function getServerSideProps(context){
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }
}