
import BackButton from '@/app/_components/BackButton';
import BookMarkPage from './BookMarkPage';
import { Lock } from 'lucide-react';
import AppSidebar from '@/app/_components/AppSidebar';

export default function Page() {
  return (
    <>
      <div >
        <div className="border-b sticky top-0 backdrop-blur-lg z-40 pt-6 bg-black border-gray-600 flex gap-2 items-center py-3 px-2 ">
          <div className="px-1 py-1 ease-in duration-100 transition-colors rounded-full flex justify-center items-center hover:bg-gray-800">
            <BackButton />
          </div>
          <div className="flex flex-col">
            <h1 style={{ lineHeight: '100%' }} className="text-gray-200 text-[1.3rem] font-bold mb-1">
              Bookmarks
            </h1>
          </div>
        </div>
        <div className="bg-[#0A1E3F] text-center gap-2 text-[#fff] py-2 px-2 flex items-center justify-center">
          <Lock size={16} /> Your Bookmarks are private. Only you can see them.
        </div>
        <BookMarkPage />
      </div>
    </>
  );
}
