interface componentProps {
  subHeader: string;
  mainHeader: string;
}
const SectionHeaders = ({ subHeader, mainHeader }: componentProps) => {
  return (
    <>
      <h3 className="text-gray-500 uppercase font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
    </>
  );
};

export default SectionHeaders;
