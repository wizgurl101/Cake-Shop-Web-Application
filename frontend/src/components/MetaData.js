import { Helmet } from "react-helmet";

const MetaData = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

// set default value for props
MetaData.defaultProps = {
  title: "Welcome to Delightful Sweets",
  description:
    "We offer the best cakes and pies in the City. No walk in needed.  Just order online and we will deliever it to your next events.",
  keywords: "bakery, cake, pies",
};

export default MetaData;
