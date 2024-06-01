import { Stack, Typography } from '@mui/material';
import { useField } from 'formik';

import { TextArea } from '../Utils/UIUtils';

export const CustomTextArea = ({
  manualMarginBottom = false,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <Stack
      direction="column"
      sx={{
        width: '100%',
        ...(manualMarginBottom && {
          marginBottom: manualMarginBottom,
        }),
      }}
      alignSelf={'flex-end'}
    >
      <Stack gap={1} sx={{}}>
        {label && (
          <Typography
            component={'label'}
            htmlFor={props.id}
            color="primary.neutral800"
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              '& +.MuiInputBase-root': {
                marginTop: 0,
              },
            }}
          >
            {label}
          </Typography>
        )}
        <TextArea
          {...field}
          {...props}
          sx={{
            '& .MuiInputBase-input': {
              borderColor: meta.error ? 'error.main' : '',
            },
          }}
        />
      </Stack>
      {meta.error ? (
        <Typography sx={{ fontSize: '14px', mt: 0.5, color: 'error.main' }}>
          {meta.error}
        </Typography>
      ) : null}
    </Stack>
  );
};
