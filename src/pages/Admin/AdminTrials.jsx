import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  Skeleton,
  Slide,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
  alpha,
  TableBody,
  TableHead,
  lighten,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { forwardRef, useEffect, useState } from 'react';
import {
  approveTrial,
  getTrialFollowUps,
  listTrials,
  rejectTrial,
  sendFollowUpEmail,
} from '../../actions/userActions';
import {
  CustomInputBase,
  CustomTextField,
  StyledButton,
  TrialStatus,
  getTransitionStyle,
} from '../../components/Utils/UIUtils';
import { theme } from '../../theme';
import {
  capitalizeFirstLetter,
  capitalizeFullName,
  formatDate,
  formatTimeAgo,
} from '../../components/Utils/Formating';
import MUIDataTable from 'mui-datatables';
import { getTrialStatusColor } from '../../components/Utils/Utils';
import {
  CheckRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  ErrorOutlineRounded,
} from '@mui/icons-material';
import { BiBlock, BiCheck, BiMailSend, BiSend, BiShow } from 'react-icons/bi';
import { Form, Formik } from 'formik';
import { CustomInput } from '../../components/Forms/CustomInput';
import { CustomTextArea } from '../../components/Forms/CustomTextArea';
import { sendTrialSchema } from '../../schemas';
import { useTranslation } from 'react-i18next';
import { SEND_TRIAL_LOGIN_ENDPOINT } from '../../components/Utils/apiEndpoints';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const sendTrialEmail = async (formData, dispatch) => {
  const response = await fetch(
    process.env.REACT_APP_BACKEND_URL + SEND_TRIAL_LOGIN_ENDPOINT,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: capitalizeFullName(formData.fullName),
        email: formData.email,
        username: formData.username,
        password: formData.password,
        host: formData.host,
        customNote: formData.customNote,
        userLanguage: formData.userLanguage,
      }),
    }
  )
    .then((res) => {
      dispatch(approveTrial(formData.trialId));
      return res.json();
    })
    .catch((error) => {
      dispatch({
        type: 'APPROVE_TRIAL_FAILED',
        payload: error.message,
      });
    });

  return response;
};

const ViewTrialDialog = ({
  viewDialogOpen,
  handleViewDialogClose,
  trial,
  theme,
}) => {
  const buttonTransition = getTransitionStyle(theme, [
    'border-color',
    'background-color',
  ]);

  return (
    trial && (
      <Dialog
        TransitionComponent={Transition}
        open={viewDialogOpen}
        onClose={handleViewDialogClose}
        aria-labelledby="send-trial-dialog-title"
        sx={{
          '& .MuiDialog-paper': {
            width: '500px',
          },
        }}
      >
        <Stack
          variant="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            px: 3,
            py: 2,
            '& .MuiChip-root': {
              backgroundColor: theme.palette.primary.neutral200,
              fontWeight: '500',
              borderRadius: theme.shape.secondaryBorderRadius,
              height: 'fit-content',
              py: 0.8,
            },
            '& .MuiChip-label': {
              color: 'primary.neutral700',
              whiteSpace: 'normal',
            },
          }}
        >
          <Typography
            id="view-send-dialog-title"
            variant="h3"
            sx={{
              color: 'primary.neutral800',
              fontSize: '24px',
              fontWeight: '600',
              my: 1,
            }}
          >
            Trial #{trial.trialId}
          </Typography>

          <Stack gap={1}>
            <Typography
              variant="body1"
              sx={{
                color: 'primary.main',
                fontSize: '14px',
                fontWeight: '600',
                mt: 1,
              }}
            >
              User Info
            </Typography>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                User Language
              </Typography>

              <Chip
                label={trial.userLanguage.toUpperCase().split('-')[0]}
                size="medium"
              />
            </Stack>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Email
              </Typography>
              <Chip label={trial.email} size="medium" />
            </Stack>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Full Name
              </Typography>
              <Chip label={capitalizeFullName(trial.fullName)} size="medium" />
            </Stack>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Phone
              </Typography>
              <Chip label={trial.phone} size="medium" />
            </Stack>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                IP Address
              </Typography>
              <Chip label={trial.userIp} size="medium" />
            </Stack>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Fingerprint
              </Typography>
              <Chip label={trial.fingerprint} size="medium" />
            </Stack>
          </Stack>

          <Stack gap={1}>
            <Typography
              variant="body1"
              sx={{
                color: 'primary.main',
                fontSize: '14px',
                fontWeight: '600',
                mt: 1,
              }}
            >
              Trial Info
            </Typography>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Created At
              </Typography>
              <Chip label={formatDate(trial.createdAt)} size="medium" />
            </Stack>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Countries
              </Typography>
              <Chip label={trial.countries} size="medium" />
            </Stack>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Devices
              </Typography>
              <Chip label={trial.devices} size="medium" />
            </Stack>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              sx={{ width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Id
              </Typography>
              <Chip label={trial.id} size="medium" />
            </Stack>
          </Stack>
        </Stack>
        <DialogContent
          sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}
        >
          <DialogActions sx={{ display: 'flex', gap: 1, p: 0 }}>
            <StyledButton
              onClick={handleViewDialogClose}
              sx={{
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: 'primary.neutral200',
                color: 'primary.neutral600',
                height: '40px',
                ...buttonTransition,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.neutral200, 0.2),
                  borderColor: theme.palette.primary.neutral200,
                },
              }}
            >
              Close
            </StyledButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  );
};

const SendTrialDialog = ({
  sendDialogOpen,
  handleSendDialogClose,
  trial,
  theme,
  t,
}) => {
  const buttonTransition = getTransitionStyle(theme, [
    'border-color',
    'background-color',
  ]);

  const trialApprovale = useSelector((state) => state.approveTrial);

  const dispatch = useDispatch();

  const onSubmit = async (values, { setSubmitting }) => {
    if (trialApprovale.success) {
      return;
    }

    const formData = {
      ...values,
      fullName: trial.fullName?.trim() || '',
      email: trial.email,
      trialId: trial.trialId,
      userLanguage: trial.userLanguage,
    };

    try {
      await sendTrialEmail(formData, dispatch);
    } catch (error) {
      dispatch({
        type: 'APPROVE_TRIAL_FAILED',
        payload: error.message,
      });
    }

    setSubmitting(false);
  };
  return (
    trial && (
      <Dialog
        TransitionComponent={Transition}
        open={sendDialogOpen}
        onClose={handleSendDialogClose}
        aria-labelledby="view-trial-dialog-title"
        sx={{
          '& .MuiDialog-paper': {
            width: '500px',
          },
        }}
      >
        <Stack
          variant="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            px: 3,
            py: 2,
          }}
        >
          <Typography
            id="view-trial-dialog-title"
            variant="h3"
            sx={{
              color: 'primary.neutral800',
              fontSize: '24px',
              fontWeight: '600',
              mt: 1,
            }}
          >
            Trial #{trial.trialId}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'primary.neutral600',
              fontSize: '14px',
              fontWeight: '400',
            }}
          >
            User Language: {trial.userLanguage.toUpperCase().split('-')[0]}
          </Typography>
        </Stack>
        <DialogContent
          sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}
        >
          <Formik
            initialValues={{
              username: '',
              password: '',
              host: '',
              fullName: capitalizeFullName(trial.fullName),
              customNote: '',
            }}
            validationSchema={() => sendTrialSchema(t)}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={onSubmit}
          >
            {() => {
              return (
                <Stack gap={2} justifyContent={'center'}>
                  <Form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                    id="send-trial-form"
                    name="send-trial-form"
                  >
                    <Stack gap={2} direction={'row'}>
                      <CustomInput
                        label={'Full Name'}
                        name="fullName"
                        id="fullName"
                        type="text"
                        autoComplete="off"
                        placeholder={'Full Name'}
                        manualMarginBottom={'16px'}
                      />
                      <CustomInput
                        label={'Username'}
                        name="username"
                        id="username"
                        type="text"
                        autoComplete="off"
                        placeholder={'Username'}
                        manualMarginBottom={'16px'}
                      />
                    </Stack>

                    <CustomInput
                      label={'Password'}
                      name="password"
                      id="password"
                      type="text"
                      autoComplete="off"
                      placeholder={'Password'}
                      manualMarginBottom={'16px'}
                    />

                    <CustomInput
                      label={'Host'}
                      name="host"
                      id="host"
                      type="text"
                      autoComplete="off"
                      placeholder={'Host'}
                      manualMarginBottom={'16px'}
                    />

                    <CustomTextArea
                      label={'Custom Note'}
                      name="customNote"
                      id="customNote"
                      type="text"
                      autoComplete="off"
                      multiline
                      placeholder={'Custom Note'}
                      manualMarginBottom={'16px'}
                    />

                    <DialogActions sx={{ display: 'flex', gap: 1, p: 0 }}>
                      <StyledButton
                        onClick={handleSendDialogClose}
                        sx={{
                          backgroundColor: 'transparent',
                          border: '1px solid',
                          borderColor: 'primary.neutral200',
                          color: 'primary.neutral600',
                          height: '40px',
                          px: 2,
                          ...buttonTransition,
                          '&:hover': {
                            backgroundColor: alpha(
                              theme.palette.primary.neutral200,
                              0.2
                            ),
                            borderColor: theme.palette.primary.neutral200,
                          },
                        }}
                      >
                        Close
                      </StyledButton>
                      <StyledButton
                        autoFocus
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'primary.white',
                          height: '40px',
                          px: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                          '&:hover': {
                            backgroundColor: lighten(
                              theme.palette.primary.main,
                              0.1
                            ),
                          },
                          '&:disabled': {
                            backgroundColor: theme.palette.primary.neutral200,
                            color: theme.palette.primary.neutral600,
                          },
                        }}
                        type="submit"
                        onSubmit={onSubmit}
                        disabled={trialApprovale.success}
                      >
                        {trialApprovale.success ? 'Sent' : 'Send'}
                        {trialApprovale.loading && (
                          <CircularProgress color="inherit" size={'16px'} />
                        )}
                      </StyledButton>
                    </DialogActions>
                  </Form>
                </Stack>
              );
            }}
          </Formik>
          {trialApprovale.error && (
            <Alert severity={'error'} icon={false}>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <ErrorOutlineRounded
                  sx={{
                    fontSize: '28px',
                    color: theme.palette.error.main,
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                    borderRadius: '50%',
                    p: 0.5,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '16px',
                    textAlign: 'left',
                    color: 'primary.neutral600',
                  }}
                >
                  {trialApprovale.error}
                </Typography>
              </Stack>
            </Alert>
          )}
          {trialApprovale.success && (
            <Alert severity={'success'} icon={false}>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <CheckRounded
                  sx={{
                    fontSize: '28px',
                    color: theme.palette.success.main,
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    borderRadius: '50%',
                    p: 0.5,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '16px',
                    textAlign: 'left',
                    color: 'primary.neutral600',
                  }}
                >
                  Trial sent successfully
                </Typography>
              </Stack>
            </Alert>
          )}
        </DialogContent>
      </Dialog>
    )
  );
};

const FollowUpBox = ({ loading, followUp, order, handleClick }) => {
  return (
    <>
      <TableCell>
        <Typography
          variant="body1"
          sx={{
            color: 'primary.neutral600',
            minWidth: { xs: '32px', sm: '64px' },
            fontSize: '14px',
          }}
        >
          {`FUP ${order}`}
        </Typography>
      </TableCell>
      <TableCell>
        {loading ? (
          <Skeleton variant="text" width={100} />
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: 'primary.neutral600',
              minWidth: '100px',
              fontSize: '14px',
            }}
          >
            {followUp?.dateSent
              ? formatTimeAgo(followUp?.dateSent)
              : 'Not Sent'}
          </Typography>
        )}
      </TableCell>
      <TableCell>
        <Tooltip
          title={loading ? '' : followUp?.dateSent ? 'Sent' : 'Send'}
          arrow
        >
          <div style={{ display: 'inline' }}>
            <CustomIconButton
              disabled={loading || followUp?.dateSent ? true : false}
              onClick={handleClick}
            >
              {loading ? (
                <CircularProgress color="inherit" size={'14px'} />
              ) : followUp?.dateSent ? (
                <BiCheck />
              ) : (
                <BiMailSend />
              )}
            </CustomIconButton>
          </div>
        </Tooltip>
      </TableCell>
    </>
  );
};

const FollowUpDialog = ({ open, handleClose, trial, theme }) => {
  const buttonTransition = getTransitionStyle(theme, [
    'border-color',
    'background-color',
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (trial) dispatch(getTrialFollowUps(trial.id));

    return () => {
      dispatch({ type: 'GET_TRIAL_FOLLOWUPS_RESET' });
    };
  }, [dispatch, trial]);

  const handleFollowUpClick = (index) => {
    dispatch(sendFollowUpEmail(trial.id, index));
  };

  const { followUps, loading } = useSelector(
    (state) => state.getTrialFollowUps
  );

  const followedMax = 3;
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      aria-labelledby="follow-up-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { xs: '100%x', sm: '500px' },
        },
      }}
    >
      <Stack
        variant="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          px: 3,
          py: 2,
        }}
      >
        <Typography
          id="follow-up-dialog-title"
          variant="h3"
          sx={{
            color: 'primary.neutral800',
            fontSize: '24px',
            fontWeight: '600',
            mt: 1,
          }}
        >
          Follow Up
        </Typography>
        {trial && (
          <Stack gap={1} sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'primary.main',
                fontSize: '14px',
                fontWeight: '600',
                mt: 1,
              }}
            >
              Follow Up Info
            </Typography>
            <Stack
              direction={'row'}
              gap={2}
              alignItems={'center'}
              sx={{ width: '100%', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                User Language
              </Typography>
              {loading ? (
                <Skeleton variant="text" width={120} />
              ) : (
                <Chip
                  label={trial.userLanguage.toUpperCase().split('-')[0]}
                  size="medium"
                />
              )}
            </Stack>
            <Stack
              direction={'row'}
              gap={2}
              alignItems={'center'}
              sx={{ width: '100%', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Trial Id
              </Typography>
              {loading ? (
                <Skeleton variant="text" width={120} />
              ) : (
                <Chip label={trial.id} size="medium" />
              )}
            </Stack>
            <Stack
              direction={'row'}
              gap={2}
              alignItems={'center'}
              sx={{ width: '100%' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Id
              </Typography>
              {loading ? (
                <Skeleton variant="text" width={120} />
              ) : (
                <Chip label={followUps?.id} size="medium" />
              )}
            </Stack>
            <Stack
              direction={'row'}
              gap={2}
              alignItems={'center'}
              sx={{ width: '100%' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.neutral600',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '35%',
                }}
              >
                Trial date
              </Typography>
              {loading ? (
                <Skeleton variant="text" width={120} />
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    color: 'primary.neutral600',
                    fontSize: '14px',
                    fontWeight: '500',
                    minWidth: '35%',
                  }}
                >
                  {formatTimeAgo(trial.createdAt)}
                </Typography>
              )}
            </Stack>
          </Stack>
        )}

        <Stack gap={1}>
          <Typography
            variant="body1"
            sx={{
              color: 'primary.main',
              fontSize: '14px',
              fontWeight: '600',
              mt: 1,
            }}
          >
            Follow Up List
          </Typography>
          <TableContainer
            sx={{
              width: '100%',
              '& .MuiPaper-root': {
                width: '100%',
                display: 'table',
                tableLayout: 'fixed',
              },
              '& .MuiTableCell-root': {
                py: '12px',
                borderColor: 'primary.neutral100',
                '&:last-child': {
                  borderTopRightRadius: theme.shape.defaultBorderRadius,
                  borderBottomRightRadius: theme.shape.defaultBorderRadius,
                },
                '&:first-of-type': {
                  borderTopLeftRadius: theme.shape.defaultBorderRadius,
                  borderBottomLeftRadius: theme.shape.defaultBorderRadius,
                },
              },
              '& .MuiTableHead-root': {
                '& .MuiTableCell-root': {
                  py: '8px',
                  borderBottom: 'none',
                },
              },
            }}
          >
            <Table aria-label="follow-up-table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: followedMax }).map((_, index) => {
                  return (
                    <TableRow key={index}>
                      <FollowUpBox
                        loading={loading}
                        followUp={
                          followUps?.followUps?.length > 0 &&
                          followUps?.followUps[index]
                        }
                        order={index + 1}
                        theme={theme}
                        handleClick={() => handleFollowUpClick(index)}
                      />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
      <DialogContent sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <DialogActions sx={{ display: 'flex', gap: 1, p: 0 }}>
          <StyledButton
            onClick={handleClose}
            sx={{
              backgroundColor: 'transparent',
              border: '1px solid',
              borderColor: 'primary.neutral200',
              color: 'primary.neutral600',
              height: '40px',
              ...buttonTransition,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.neutral200, 0.2),
                borderColor: theme.palette.primary.neutral200,
              },
            }}
          >
            Close
          </StyledButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

const ConfirmDialog = ({ open, handleClose, trial, handleConfirm, theme }) => {
  const buttonTransition = getTransitionStyle(theme, [
    'border-color',
    'background-color',
  ]);
  const trialRejected = useSelector((state) => state.rejectTrial);

  useEffect(() => {
    if (trialRejected.success) {
      handleClose();
    }
  }, [trialRejected, handleClose]);

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          width: '500px',
        },
      }}
    >
      <Stack
        variant="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          px: 3,
          py: 2,
        }}
      >
        <Typography
          id="confirm-dialog-title"
          variant="h3"
          sx={{
            color: 'primary.neutral800',
            fontSize: '24px',
            fontWeight: '600',
            mt: 1,
          }}
        >
          Confirm
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'primary.neutral600',
            fontSize: '14px',
            fontWeight: '400',
          }}
        >
          Are you sure you want to reject this trial?
        </Typography>
      </Stack>
      <DialogContent sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <DialogActions sx={{ display: 'flex', gap: 1, p: 0 }}>
          <StyledButton
            onClick={handleClose}
            sx={{
              backgroundColor: 'transparent',
              border: '1px solid',
              borderColor: 'primary.neutral200',
              color: 'primary.neutral600',
              height: '40px',
              ...buttonTransition,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.neutral200, 0.2),
                borderColor: theme.palette.primary.neutral200,
              },
            }}
          >
            Close
          </StyledButton>
          <StyledButton
            autoFocus
            sx={{
              backgroundColor: 'error.main',
              color: 'primary.white',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              ...buttonTransition,
              '&:hover': {
                backgroundColor: lighten(theme.palette.error.main, 0.1),
              },
            }}
            onClick={() => handleConfirm(trial.trialId)}
          >
            Reject
            {trialRejected.loading && (
              <CircularProgress color="inherit" size={'16px'} />
            )}
          </StyledButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

const CustomIconButton = ({ children, ...props }) => {
  return (
    <IconButton
      sx={{
        borderRadius: theme.shape.defaultBorderRadius,
        border: '1px solid',
        borderColor: 'primary.neutral200',
        width: '32px',
        height: '32px',
        p: 0.8,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.neutral100, 0.5),
        },
      }}
      {...props}
    >
      {children}
    </IconButton>
  );
};

const columns = [
  {
    name: 'trialId',
    label: 'ID',
    options: {
      setCellProps: () => ({ style: { width: '160px' } }),
      filter: false,
      sort: false,
    },
  },
  {
    name: 'customer',
    label: 'Customer',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'createdAt',
    label: 'Created At',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'status',
    label: 'Status',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'actions',
    label: 'Actions',
    options: {
      filter: false,
      sort: false,
    },
  },
];

function convertTrialToData(
  trial,
  handleViewDialogOpen,
  handleSendDialogOpen,
  handleConfirmDialogOpen,
  handleFollowUpDialogOpen
) {
  return {
    trialId: (
      <Typography
        sx={{
          color: 'primary.neutral800',
          fontSize: '14px',
        }}
      >
        {trial.trialId}
      </Typography>
    ),
    customer: (
      <Stack gap={0.5}>
        <Typography
          sx={{
            color: 'primary.neutral800',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          {capitalizeFullName(trial.fullName)}
        </Typography>
        <Typography
          sx={{
            color: 'primary.neutral500',
            fontSize: '13px',
          }}
        >
          {' '}
          {trial.email}
        </Typography>
      </Stack>
    ),
    createdAt: (
      <Stack gap={0.5}>
        <Typography
          sx={{
            color: 'primary.neutral800',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          {formatTimeAgo(trial.createdAt)}
        </Typography>
        <Typography
          sx={{
            color: 'primary.neutral500',
            fontSize: '13px',
          }}
        >
          {formatDate(trial.createdAt)}
        </Typography>
      </Stack>
    ),
    status: (
      <Chip
        label={capitalizeFirstLetter(trial.status)}
        sx={{
          backgroundColor: alpha(getTrialStatusColor(trial.status), 0.1),
          '& .MuiChip-label': {
            color: getTrialStatusColor(trial.status),
          },
          fontWeight: '500',
          borderRadius: theme.shape.secondaryBorderRadius,
          height: 'fit-content',
          py: 0.8,
        }}
        size="medium"
      />
    ),
    actions: (
      <Stack gap={1} direction="row">
        {!trial.statusFlags.isApproved && !trial.statusFlags.isRejected && (
          <Tooltip title="Reject" arrow>
            <div>
              <CustomIconButton onClick={() => handleConfirmDialogOpen(trial)}>
                <BiBlock />
              </CustomIconButton>
            </div>
          </Tooltip>
        )}

        {!trial.statusFlags.isApproved &&
          trial.statusFlags.isRejected === false && (
            <Tooltip title="Send & Approve" arrow>
              <div>
                <CustomIconButton
                  disabled={trial.statusFlags.isApproved}
                  onClick={() => handleSendDialogOpen(trial)}
                >
                  <BiSend />
                </CustomIconButton>
              </div>
            </Tooltip>
          )}
        <Tooltip title="View" arrow>
          <div>
            <CustomIconButton onClick={() => handleViewDialogOpen(trial)}>
              <BiShow />
            </CustomIconButton>
          </div>
        </Tooltip>
        {trial.status !== TrialStatus.APPROVED &&
          trial.status !== TrialStatus.REJECTED &&
          trial.status !== TrialStatus.PENDING && (
            <Tooltip title="Follow Up" arrow>
              <div>
                <CustomIconButton
                  onClick={() => handleFollowUpDialogOpen(trial)}
                >
                  <BiMailSend />
                </CustomIconButton>
              </div>
            </Tooltip>
          )}
      </Stack>
    ),
  };
}

function convertTrialToSkeleton() {
  return {
    trialId: (
      <Box width={128}>
        <Skeleton variant="text" width={120} height={20} />
      </Box>
    ),
    customer: (
      <Stack gap={0.5} width={320}>
        <Skeleton variant="text" width={80} height={20} />
        <Skeleton variant="text" width={280} height={20} />
      </Stack>
    ),
    createdAt: (
      <Stack gap={0.5}>
        <Skeleton variant="text" width={80} height={20} />
        <Skeleton variant="text" width={160} height={20} />
      </Stack>
    ),
    status: (
      <Box width={128}>
        <Skeleton variant="rounded" width={80} height={32} />
      </Box>
    ),
    actions: (
      <Stack gap={1} direction="row">
        <Skeleton variant="rounded" width={32} height={32} />
        <Skeleton variant="rounded" width={32} height={32} />
        <Skeleton variant="rounded" width={32} height={32} />
      </Stack>
    ),
  };
}

function AdminTrials() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const { trials, count, loading } = useSelector((state) => state.listTrials);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { t } = useTranslation();

  const options = {
    download: false,
    elevation: 0,
    print: false,
    filter: false,
    search: false,
    selectableRows: 'none',
    viewColumns: false,
    rowsPerPageOptions: [],
    responsive: 'standard',
    caseSensitive: false,
    customFooter: () => null,
  };

  const [status, setStatus] = useState('all');

  useEffect(() => {
    dispatch(listTrials('all', pageSize, status));
  }, [dispatch, pageSize, status]);

  const handleNextPage = () => {
    const totalPages = Math.ceil(count / pageSize);
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
      dispatch(listTrials('next', pageSize, status));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      dispatch(listTrials('prev', pageSize, status));
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleRejectTrial = (trialId) => {
    dispatch(rejectTrial(trialId));
  };

  const statuses = [
    { value: 'all', label: 'All' },
    { value: TrialStatus.APPROVED, label: 'Approved' },
    { value: TrialStatus.PENDING, label: 'Pending' },
    { value: TrialStatus.REJECTED, label: 'Rejected' },
    { value: TrialStatus.EXPIRED, label: 'Expired' },
  ];

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false);

  const [trial, setTrial] = useState(null);

  const handleViewDialogOpen = (trial) => {
    setViewDialogOpen(true);
    setTrial(trial);
  };

  const handleViewDialogClose = () => {
    setViewDialogOpen(false);
  };

  const handleSendDialogOpen = (trial) => {
    setSendDialogOpen(true);
    setTrial(trial);
  };

  const handleSendDialogClose = () => {
    setSendDialogOpen(false);
  };

  const handleConfirmDialogOpen = (trial) => {
    setConfirmDialogOpen(true);
    setTrial(trial);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleFollowUpDialogOpen = (trial) => {
    setFollowUpDialogOpen(true);
    setTrial(trial);
  };

  const handleFollowUpDialogClose = () => {
    setFollowUpDialogOpen(false);
  };

  useEffect(() => {
    if (trials) {
      const newData = trials.map((trial) =>
        convertTrialToData(
          trial,
          handleViewDialogOpen,
          handleSendDialogOpen,
          handleConfirmDialogOpen,
          handleFollowUpDialogOpen
        )
      );
      setData(newData);
    }
    if (loading) {
      const skeletonData = Array.from({ length: pageSize }, (_, index) =>
        convertTrialToSkeleton()
      );
      setData(skeletonData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trials]);

  return (
    <Stack gap={2}>
      <Typography
        variant="h1"
        sx={{
          fontSize: '20px',
          color: 'primary.neutral900',
          fontWeight: '500',
        }}
      >
        Trials
      </Typography>
      <Stack
        sx={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Stack
          sx={{
            borderRadius: theme.shape.defaultBorderRadius,
            bgcolor: 'white',
            border: '1px solid',
            borderColor: 'primary.neutral200',
            p: 2,
            flex: 3,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
          }}
        >
          <Stack direction={'row'} gap={1} sx={{ width: '100%' }}>
            <Stack gap={1} sx={{ width: '100%' }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '14px',
                  color: 'primary.neutral600',
                  fontWeight: '500',
                }}
              >
                Search for trials
              </Typography>
              <CustomTextField
                placeholder="Search"
                name="searchInput"
                id="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.primary.neutral200,
                    },
                  },
                }}
              />
            </Stack>

            <Stack gap={1}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '14px',
                  color: 'primary.neutral600',
                  fontWeight: '500',
                }}
              >
                Status
              </Typography>
              <Select
                labelId="status-label"
                id="status"
                value={status}
                onChange={handleStatusChange}
                input={<CustomInputBase />}
                sx={{
                  '& .MuiInputBase-input': {
                    borderColor: theme.palette.primary.neutral200,
                  },
                }}
              >
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Stack>
          <Box
            sx={{
              width: '100%',
              '& .MuiPaper-root': {
                width: '100%',
                display: 'table',
                tableLayout: 'fixed',
              },
            }}
          >
            <MUIDataTable data={data} columns={columns} options={options} />
          </Box>
          <Stack direction={'row'} gap={1} sx={{ alignSelf: 'center' }}>
            <CustomIconButton
              disabled={page === 1}
              onClick={handlePreviousPage}
            >
              <ChevronLeftRounded />
            </CustomIconButton>
            <CustomIconButton
              disabled={page === Math.ceil(count / pageSize) || count === 0}
              onClick={handleNextPage}
            >
              <ChevronRightRounded />
            </CustomIconButton>
          </Stack>
        </Stack>
      </Stack>
      <ViewTrialDialog
        viewDialogOpen={viewDialogOpen}
        handleViewDialogClose={handleViewDialogClose}
        trial={trial}
        theme={theme}
      />
      <SendTrialDialog
        sendDialogOpen={sendDialogOpen}
        handleSendDialogClose={handleSendDialogClose}
        trial={trial}
        theme={theme}
        t={t}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        handleClose={handleConfirmDialogClose}
        trial={trial}
        handleConfirm={handleRejectTrial}
        theme={theme}
      />
      <FollowUpDialog
        open={followUpDialogOpen}
        handleClose={handleFollowUpDialogClose}
        trial={trial}
        theme={theme}
      />
    </Stack>
  );
}

export default AdminTrials;
