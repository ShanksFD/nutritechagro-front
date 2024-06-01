import { Box } from '@mui/material';

export default function Container(props) {
  return (
    <Box
      sx={{
        ...props.sx,
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        px: '16px',
      }}
    >
      {props.children}
    </Box>
  );
}
