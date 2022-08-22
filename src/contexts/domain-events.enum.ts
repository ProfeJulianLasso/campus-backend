export enum DomainEvents {
  Students_GetAllStudents = 'Students.GetAllStudents',
  Students_AllTheObtainedStudents = 'Students.AllTheObtainedStudents',

  Students_FindByUUID = 'Students.FindByUuid',
  Students_UUIDFound = 'Students.UUIDFound',

  Students_FindByFullName = 'Students.FindByFullName',
  Students_FullNameFound = 'Students.FullNameFound',

  Students_FindByEmail = 'Students.FindByEmail',
  Students_EmailFound = 'Students.EmailFound',

  Student_Register = 'Student.Register',
  Student_Registered = 'Student.Registered',

  Student_Modify = 'Student.Modify',
  Student_Modified = 'Student.Modified',

  Student_Activate = 'Student.Activate',
  Student_Activated = 'Student.Activated',

  Student_Deactivate = 'Student.Deactivate',
  Student_Deactivated = 'Student.Deactivated',

  Student_Delete = 'Student.Delete',
  Student_Deleted = 'Student.Deleted',
}
