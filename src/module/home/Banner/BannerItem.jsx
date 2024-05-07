const BannerItem = ({ url }) => {
  return (
    <>
      <img src={url} className="object-cover w-full h-full rounded-2xl" />
    </>
  );
};

export default BannerItem;
