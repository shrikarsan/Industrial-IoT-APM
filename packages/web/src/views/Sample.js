import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const Sample = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
};

export default Sample;
