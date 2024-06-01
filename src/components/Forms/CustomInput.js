import { Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { CustomTextField } from '../Utils/UIUtils';

export const CustomInput = ({
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
    >
      <Stack gap={1}>
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
        <CustomTextField
          {...field}
          {...props}
          sx={{
            '& .MuiInputBase-root fieldset': {
              borderColor: meta.error ? 'error.main' : '',
            },
            '& .MuiFormHelperText-root': {
              ml: 1,
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
