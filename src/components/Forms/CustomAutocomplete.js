import { useField } from 'formik';
import {
  Stack,
  Typography,
  Autocomplete,
  Box,
  alpha,
  useMediaQuery,
} from '@mui/material';
import { theme } from '../../theme';
import { Clear } from '@mui/icons-material';
import { CustomTextField } from '../Utils/UIUtils';
import { Fragment } from 'react';

const Chip = ({ text, handleDeleteOption }) => {
  return (
    <Box
      sx={{
        borderRadius: theme.shape.secondaryBorderRadius,
        backgroundColor: alpha(theme.palette.primary.neutral100, 0.3),
        border: '1px solid',
        borderColor: 'primary.neutral300',
        px: '10px',
        py: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        minHeight: '22px',
        height: '28px',
      }}
    >
      <Typography
        variant="body"
        fontSize={'12px'}
        sx={{ color: 'primary.neutral800' }}
      >
        {text}
      </Typography>
      <Clear
        sx={{
          color: 'primary.neutral800',
          cursor: 'pointer',
          fontSize: '16px',
        }}
        onClick={handleDeleteOption}
      />
    </Box>
  );
};

export function CustomAutocomplete({
  manualMarginBottom = false,
  label,
  options,
  placeholder,
  ...props
}) {
  const [field, meta] = useField(props);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
      <Stack gap={1} alignItems={'flex-start'} sx={{ width: '100%' }}>
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
        <Autocomplete
          {...field}
          id={props.id}
          options={options}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          value={field.value}
          onChange={(e, value) => {
            field.onChange({
              target: {
                name: field.name,
                value: value,
              },
            });
          }}
          disableCloseOnSelect
          multiple
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              py: '2.5px',
              fontSize: '14px',
            },
            '& .MuiInputBase-root fieldset': {
              borderColor: meta.error ? 'error.main' : '',
            },
          }}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              placeholder={field.value.length === 0 ? placeholder : ''}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <Stack
                    sx={{
                      display: 'flex',
                      gap: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    {field.value
                      .slice(0, isMobile ? 1 : 2)
                      .map((country, index) => (
                        <Fragment key={index}>
                          <Chip
                            text={country.name}
                            handleDeleteOption={() => {
                              const newOptions = field.value.filter(
                                (option) => option.name !== country.name
                              );
                              field.onChange({
                                target: {
                                  name: field.name,
                                  value: newOptions,
                                },
                              });
                            }}
                          />
                        </Fragment>
                      ))}
                    {field.value.length > (isMobile ? 1 : 2) && (
                      <Typography
                        variant="body"
                        fontSize={'14px'}
                        sx={{ color: 'primary.neutral700' }}
                      >
                        +{field.value.length - 2}
                      </Typography>
                    )}
                  </Stack>
                ),
              }}
            />
          )}
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
