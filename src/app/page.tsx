import Image from 'next/image';
import NavigateBar from './ui/navigatebar/navigatebar';
import HeaderSection from './ui/header/headerSection';

export default function Home() {
  return (
    <>
      <HeaderSection />
      <NavigateBar />
    </>
  );
}
