import { React } from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  SimpleForm,
  ReferenceArrayField,
  Show,
  SimpleShowLayout,
  DisabledInput,
  Edit,
  Filter,
  TextInput,
  SelectField,
  NumberInput,
  SelectInput ,
  ReferenceField,
  DateField,
} from "admin-on-rest";
import BlockButton from "./BlockButton";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const UserList = (props) => {
  return (
    <List {...props} filters={<UserFilter />}>
      <Datagrid>
        <TextField source="username" />
        <TextField source="fullName" />
        <TextField source="level" />
        <EditButton />
        <BlockButton />
      </Datagrid>
    </List>
  );
};

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="fullName" />
      <TextField source="level" />
      <TextField source="dailyDownloadingQuota" label="Daily Download Quota" />
      <TextField
        source="totalUploadedFileSize"
        label="Total Uploaded File Size"
      />
    </SimpleShowLayout>
  </Show>
);

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm redirect="show">
      <DisabledInput label="Id" source="id" />
      <DisabledInput source="username" />
      <TextInput source="fullName" />
      <SelectInput 
        source="level"
        choices={[
          { id: "BRONZE", name: "BRONZE" },
          { id: "SILVER", name: "SILVER" },
          { id: "GOLD", name: "GOLD" },
        ]}
      />
      <NumberInput  source="dailyDownloadingQuota" label="Daily Download Quota" />
      <NumberInput 
        source="totalUploadedFileSize"
        label="Total Uploaded File Size"
      />
    </SimpleForm>
  </Edit>
);
