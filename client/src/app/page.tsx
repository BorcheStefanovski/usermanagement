'use client';

import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../helpers/fetchData";
import { setUser } from "../redux/reducers/userSlice";
import { User } from '../../../shared/types/index';
import { AVAILABLE_ROLES, REQUEST_METHODS, SERVER_ENDPOINTS } from "../constants/app";
import MainUsersView from "../views/MainUsersView";
import { ErrorMessages } from "./edit/page";

export interface MainUsers {}

export interface MainUsersViewProps extends MainUsers {
  users: User[];
  onSearchUpdate: (value: string) => void;
  onAddUserClick: () => void;
  isAddFormOpen: boolean;
  errors: ErrorMessages;
  onSubmitButtonClick: (e: React.FormEvent) => void;
  userDetails: {
    name: string;
    email: string;
    age: number;
    role: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onEditButtonClick: (user: User) => void;
  onDeleteButtonClick: (user: User) => void;
  isConfirmModalOpen: boolean;
  onDeleteModalClose: () => void;
  onDeleteModalConfirm: () => void;
  selectedUser?: User;
}

export default function FirstPost() {
  const dispatch = useDispatch();

  const [usersList, setUsersList] = useState<User[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);

  const fetchUsers = useCallback(async () => {
    const url = SERVER_ENDPOINTS.read;
    try {
      const users = await fetchData<User[]>(url);
      setUsersList(users);
      setVisibleUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  const deleteUser = useCallback(async (userId: string) => {
    try {
      await fetchData(`${SERVER_ENDPOINTS.delete}/${userId}`, { method: REQUEST_METHODS.post });
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onSearchUpdate = useCallback((value: string) => {
    const searchVal = value.toLowerCase();

    if (!searchVal.trim()) {
      setVisibleUsers(usersList);
      return;
    }

    const filteredUsers = usersList.filter((user) => {
      const { name, age, email, role } = user;
      return (
        (name && name.toLowerCase().includes(searchVal)) ||
        (age !== undefined && age.toString().includes(searchVal)) ||
        (email && email.toLowerCase().includes(searchVal)) ||
        (role && role.toLowerCase().includes(searchVal))
      );
    });

    setVisibleUsers(filteredUsers);
  }, [usersList]);

  const onDeleteButtonClick = useCallback((user: User) => {
    setSelectedUser(user);
    setIsConfirmModalOpen(true);
  }, []);

  const onDeleteModalConfirm = useCallback(async () => {
    if (!selectedUser?._id) return;
    await deleteUser(selectedUser._id);
    setIsConfirmModalOpen(false);
  }, [deleteUser, selectedUser]);

  const onDeleteModalClose = useCallback(() => {
    setIsConfirmModalOpen(false);
  }, []);

  const onAddUserClick = useCallback(() => {
    setIsAddFormOpen(prev => !prev);
  }, []);

  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    age: number;
    role: string;
  }>({
    name: '',
    email: '',
    age: 0,
    role: AVAILABLE_ROLES[0],
  });

  const onFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: name === 'age' ? Number(value) : value,
    }));
  }, []);

  const onSubmitButtonClick = useCallback(async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    await fetchData(SERVER_ENDPOINTS.create, { body: userDetails, method: REQUEST_METHODS.post });
    setUserDetails({
      name: '',
      email: '',
      age: 0,
      role: AVAILABLE_ROLES[0],
    });
    await fetchUsers();
  }, [fetchUsers, userDetails]);

  const onEditButtonClick = useCallback((user: User) => {
    dispatch(setUser(user));
  }, [dispatch]);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: '',
  });

  const validate = useCallback(() => {
    const newErrors = { name: '', email: '', age: '' };
    let isValid = true;

    if (!userDetails.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = 'Enter a valid email';
      isValid = false;
    }

    if (userDetails.age <= 0) {
      newErrors.age = 'Age must be greater than 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [userDetails]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitButtonClick(e);
    }
  }, [onSubmitButtonClick, validate]);

  return (
    <MainUsersView
      users={visibleUsers}
      isAddFormOpen={isAddFormOpen}
      userDetails={userDetails}
      isConfirmModalOpen={isConfirmModalOpen}
      selectedUser={selectedUser}
      errors={errors}
      onSearchUpdate={onSearchUpdate}
      onAddUserClick={onAddUserClick}
      onSubmitButtonClick={handleSubmit}
      onChange={onFormChange}
      onEditButtonClick={onEditButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onDeleteModalClose={onDeleteModalClose}
      onDeleteModalConfirm={onDeleteModalConfirm}
    />
  );
}
