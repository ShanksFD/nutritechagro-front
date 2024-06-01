import {
  Button,
  styled,
  InputBase,
  TextField,
  Box,
  CircularProgress,
  circularProgressClasses,
  Link,
} from '@mui/material';
import {
  BiBasket,
  BiCog,
  BiConversation,
  BiHomeAlt2,
  BiHourglass,
  BiPackage,
  BiUser,
} from 'react-icons/bi';

export const getTransitionStyle = (theme, properties) => {
  const transitionProperties = properties.map((property) => {
    return `${property} ${theme.transitions.duration.standard} ${theme.transitions.easing.easeInOut}`;
  });

  return {
    transition: transitionProperties.join(', '),
  };
};

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.main,
  fontWeight: '400',
  textDecoration: 'none',
  fontSize: '15px',
  whiteSpace: 'nowrap',
  '&:hover': {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
  ...getTransitionStyle(theme, ['color']),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: '8px 12px',
  height: '45px',
  fontSize: '15px',
  fontWeight: '400',
  ...getTransitionStyle(theme, ['background-color']),
}));

export const CustomTextField = styled(TextField)(({ theme, sx }) => ({
  ...sx,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.defaultBorderRadius,
    position: 'relative',
    backgroundColor: theme.palette.primary.white,
    fontSize: 16,
    width: '100%',
    '& fieldset': {
      ...getTransitionStyle(theme, ['border-color']),
      border: '1px solid',
      borderColor: theme.palette.primary.neutral300,
    },
    '&:hover fieldset': {
      border: '1px solid',
      borderColor: theme.palette.primary.neutral300,
    },
    '&.Mui-focused fieldset': {
      border: '1px solid',
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    minHeight: '24px',
    padding: '10px 12px',
  },
}));

export const CustomInputBase = styled(InputBase)(
  ({ theme, bordercolor, sx }) => ({
    ...sx,
    width: '100%',
    '& .MuiInputBase-input': {
      minHeight: '24px',
      minWidth: '128px',
      position: 'relative',
      backgroundColor: theme.palette.primary.white,
      border: '1px solid',
      borderRadius: theme.shape.defaultBorderRadius,
      borderColor: bordercolor ? bordercolor : theme.palette.primary.neutral300,
      fontSize: 16,
      width: '100%',
      padding: '9.5px 12px',
      ...getTransitionStyle(theme, [
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:focus': {
        borderColor: theme.palette.primary.main,
        borderRadius: theme.shape.defaultBorderRadius,
      },
    },
  })
);

export const TextArea = styled(InputBase)(({ theme }) => ({
  width: '100%',
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    minHeight: '24px',
    borderRadius: theme.shape.defaultBorderRadius,
    position: 'relative',
    backgroundColor: theme.palette.primary.white,
    border: '1px solid',
    borderColor: theme.palette.primary.neutral300,
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    resize: 'vertical',
    ...getTransitionStyle(theme, [
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& textarea': { resize: 'vertical' },
}));

export const WebsiteLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: 'primary.main',
          animationDuration: '550ms',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
      />
    </Box>
  );
};

export const hasRoles = (user, roles) => {
  if (!user || !user.roles) {
    return false;
  }
  return roles.some((role) => user.roles.includes(role));
};

export const UserRoles = {
  CUSTOMER: 'customer',
  ADMINISTRATOR: 'admin',
  GUEST: 'guest',
  SUBSCRIBER: 'subscriber',
};

export const Providers = {
  email: 'email',
  google: 'google',
  facebook: 'facebook',
  twitter: 'twitter',
};

export const TrialStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  REJECTED: 'rejected',
  APPROVED: 'approved',
  COMPLETED: 'completed',
  PURCHASED: 'purchased',
  EXPIRED: 'expired',
};

export const links = [
  {
    to: '/admin',
    label: 'Dashboard',
    order: 0,
    subItems: [],
    icon: (
      <BiHomeAlt2
        style={{
          fontSize: '19px',
        }}
      />
    ),
  },
  {
    to: '/admin/trials',
    label: 'Trials',
    order: 1,
    subItems: [],
    icon: (
      <BiHourglass
        style={{
          fontSize: '19px',
        }}
      />
    ),
  },
  {
    to: '/admin/support',
    label: 'Support',
    order: 3,
    subItems: [],
    icon: (
      <BiConversation
        style={{
          fontSize: '19px',
        }}
      />
    ),
  },
  {
    to: '/admin/orders',
    label: 'Orders',
    order: 3,
    subItems: [],
    icon: (
      <BiBasket
        style={{
          fontSize: '19px',
        }}
      />
    ),
  },
  {
    to: '/admin/products',
    label: 'Products',
    order: 3,
    subItems: [],
    icon: (
      <BiPackage
        style={{
          fontSize: '19px',
        }}
      />
    ),
  },
  {
    to: '/admin/customers',
    label: 'Customers',
    order: 3,
    subItems: [],
    icon: (
      <BiUser
        style={{
          fontSize: '19px',
        }}
      />
    ),
  },
  {
    to: '/admin/settings',
    label: 'Settings',
    order: 2,
    subItems: [],
    icon: (
      <BiCog
        style={{
          fontSize: '19px',
        }}
      />
    ),
  },
];

export const getPathTitle = (path) => {
  const segments = path.split('/');

  if (segments.length > 2) {
    return segments[2].charAt(0).toUpperCase() + segments[2].slice(1);
  }

  const link = links.find((link) => link.to.includes(path));
  if (link) {
    return link.label;
  } else {
    return 'Admin';
  }
};
