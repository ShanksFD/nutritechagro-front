import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { useField } from 'formik';
import { Stack, Typography, alpha } from '@mui/material';
import { theme } from '../../theme';
import { getTransitionStyle } from '../Utils/UIUtils';

const Icon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow: `inset 0 0 0 1px ${theme.palette.primary.neutral300}`,
  backgroundColor: theme.palette.primary.white,
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  ...getTransitionStyle(theme, ['background-color']),
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
  boxShadow: 'none',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  ...getTransitionStyle(theme, ['background-color']),
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary.primary700,
  },
});

export function CustomRadio(props) {
  return (
    <Radio
      color="default"
      disableRipple
      checkedIcon={<CheckedIcon />}
      icon={<Icon />}
      {...props}
    />
  );
}

export default function CustomRadios({
  manualMarginBottom = false,
  label,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <FormControl
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        ...(manualMarginBottom && {
          marginBottom: manualMarginBottom,
        }),
      }}
    >
      <Stack gap={1} alignItems={'flex-start'}>
        {label && (
          <Typography
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
        <RadioGroup aria-labelledby={props.id} id={props.id} {...field} row>
          {props.children}
        </RadioGroup>
      </Stack>
      {meta.error ? (
        <Typography sx={{ fontSize: '14px', mt: 0.5, color: 'error.main' }}>
          {meta.error}
        </Typography>
      ) : null}
    </FormControl>
  );
}
