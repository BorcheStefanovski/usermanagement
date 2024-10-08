'use client';

import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchData } from "../../helpers/fetchData";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../redux/selectors/userSelectors";
import { User } from '../../../../shared/types/index';
import { ERROR_MESSAGES, REQUEST_METHODS, SERVER_ENDPOINTS } from "../../constants/app";
import EditUserView from "../../views/EditUserView";
import Error from "../../components/error/error";

export interface EditUserProps {}

export interface ErrorMessages {
  name?: string;
  email?: string;
  age?: string;
  role?: string;
}

export interface EditUserViewProps extends EditUserProps {
  userDetails?: User | null;
  isFormEdited: boolean;
  errors: ErrorMessages;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  validateField: (name: string, value: string | number) => void;
}

const EditUser = () => {
  const selectedUserDetails = useSelector(selectUserDetails);

  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [initialUserDetails, setInitialUserDetails] = useState<User | null>(null);
  const [errors, setErrors] = useState<ErrorMessages>({});

  useEffect(() => {
    if (selectedUserDetails) {
      setInitialUserDetails(selectedUserDetails);
      setUserDetails(selectedUserDetails);
    }
  }, [selectedUserDetails]);

  const validateField = useCallback((name: string, value: string | number) => {
    let errorMessage = '';

    if (!value) {
      errorMessage = ERROR_MESSAGES.required_field;
    } else {
      switch (name) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value as string)) {
            errorMessage = ERROR_MESSAGES.invalid_email;
          }
          break;
        case 'age':
          if (typeof value === 'number' && value < 0) {
            errorMessage = ERROR_MESSAGES.invalid_age;
          }
          break;
        default:
          break;
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  }, []);

  const onFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setUserDetails(prevDetails => {
        if (!prevDetails) return null;

        return {
          ...prevDetails,
          [name]: name === 'age' ? Number(value) : value,
        };
      });
      validateField(name, value);
    },
    [validateField]
  );

  const onSubmitButtonClick = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (userDetails) {
        await fetchData(`${SERVER_ENDPOINTS.update}/${userDetails._id}`, {
          body: userDetails,
          method: REQUEST_METHODS.post,
        });
        window.location.assign('/');
      }
    },
    [userDetails]
  );

  const isFormEdited = useMemo(() => {
    if (initialUserDetails && userDetails) {
      return (
        initialUserDetails.name !== userDetails.name ||
        initialUserDetails.email !== userDetails.email ||
        initialUserDetails.age !== userDetails.age ||
        initialUserDetails.role !== userDetails.role
      );
    }
    return false;
  }, [initialUserDetails, userDetails]);

  if (!selectedUserDetails) return <Error message={ERROR_MESSAGES.no_user_found} />;

  return (
    <EditUserView
      userDetails={userDetails}
      isFormEdited={isFormEdited}
      onSubmit={onSubmitButtonClick}
      onChange={onFormChange}
      errors={errors}
      validateField={validateField}
    />
  );
};

export default EditUser;
