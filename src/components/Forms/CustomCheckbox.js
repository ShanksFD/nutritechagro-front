import { useField } from 'formik';
import { Checkbox, Stack, Typography, styled, alpha } from '@mui/material';

import { theme } from '../../theme';
import { getTransitionStyle } from '../Utils/UIUtils';

const Icon = styled('span')(({ theme }) => ({
  borderRadius: theme.shape.checkboxBorderRadius,
  width: 16,
  height: 16,
  backgroundColor: theme.palette.primary.white,
  ...getTransitionStyle(theme, ['background-color']),
  boxShadow: `inset 0 0 0 1px ${theme.palette.primary.neutral300}`,
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: alpha(theme.palette.primary.neutral100, 0.5),
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.neutral400,
  },
}));

const CheckedIcon = styled(Icon)({
  backgroundColor: theme.palette.primary.main,
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  ...getTransitionStyle(theme, ['background-color']),
  boxShadow: 'none',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary.primary700,
  },
});

export function CustomCheckbox({
  manualMarginBottom = false,
  direction = 'row-reverse',
  label,
  labelFontSize = '16px',
  labelWeight = '500',
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <Stack
      direction="column"
      alignItems={'flex-start'}
      sx={{
        width: '100%',
        ...(manualMarginBottom && {
          marginBottom: manualMarginBottom,
        }),
      }}
    >
      <Stack gap={1.5} direction={direction} alignItems={'flex-start'}>
        {label && (
          <Typography
            component={'label'}
            htmlFor={props.id}
            color="primary.neutral800"
            sx={{
              fontSize: labelFontSize,
              fontWeight: labelWeight,
              '& +.MuiInputBase-root': {
                marginTop: 0,
              },
            }}
          >
            {label}
          </Typography>
        )}
        <Checkbox
          sx={{
            padding: 0,
            mt: 0.5,
            '&:hover': { bgcolor: 'transparent' },
          }}
          disableRipple
          color="default"
          checkedIcon={<CheckedIcon />}
          icon={<Icon />}
          {...props}
          {...field}
        />
      </Stack>
      {meta.error ? (
        <Typography sx={{ fontSize: '14px', mt: 0.5, color: 'error.main' }}>
          {meta.error}
        </Typography>
      ) : null}
    </Stack>
  );
}
