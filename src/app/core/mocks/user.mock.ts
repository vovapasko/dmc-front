import {Groups} from '../models/instances/groups';

export const mockUsers = [
    {
        id: 1,
        email: 'super@superuser.com',
        firstName: '',
        lastName: '',
        dateJoined: '2020-04-04T11:32:39.914956Z',
        dateUpdated: '2020-04-04T11:32:39.915075Z',
        isActive: true,
        isConfirmed: false,
        // tslint:disable-next-line:max-line-length
        avatar: 'https://dmc-backend-bucket.s3.amazonaws.com/main_app/avatar_2x.png?AWSAccessKeyId=AKIAV6EGPTQA2TYVNWMI&Signature=5Yfz861DoSc5hr9i194GLmo2MWE%3D&Expires=1586706900',
        isStaff: true,
        isSuperuser: true,
        groups: [
            {
                id: 1,
                name: 'Superuser',
                permissions: []
            }
        ],
        groupsCascadeDown: [
            Groups.Admin,
            'Manager',
            'Client'
        ]
    },
    {
        id: 2,
        email: 'admin@admin.com',
        firstName: 'admin',
        lastName: 'adminovich',
        dateJoined: '2020-04-04T11:32:40.484940Z',
        dateUpdated: '2020-04-04T13:33:43.560764Z',
        isActive: true,
        isConfirmed: false,
        // tslint:disable-next-line:max-line-length
        avatar: 'https://dmc-backend-bucket.s3.amazonaws.com/main_app/users_pictures/image_Ih3JoQU.png?AWSAccessKeyId=AKIAV6EGPTQA2TYVNWMI&Signature=KS1DstQ3elUKKBhRGxagVU%2FiqNU%3D&Expires=1586706900',
        isStaff: true,
        isSuperuser: false,
        groups: [
            {
                id: 4,
                name: 'Client',
                permissions: []
            }
        ],
        groupsCascadeDown: []
    }
];

export const mockUser = {
    id: 3,
    email: 'admin@admin.com',
    firstName: 'admin',
    lastName: 'adminovich',
    dateJoined: '2020-04-04T11:32:40.484940Z',
    dateUpdated: '2020-04-04T13:33:43.560764Z',
    isActive: true,
    isConfirmed: false,
    // tslint:disable-next-line:max-line-length
    avatar: 'https://dmc-backend-bucket.s3.amazonaws.com/main_app/users_pictures/image_Ih3JoQU.png?AWSAccessKeyId=AKIAV6EGPTQA2TYVNWMI&Signature=KS1DstQ3elUKKBhRGxagVU%2FiqNU%3D&Expires=1586706900',
    isStaff: true,
    isSuperuser: false,
    groups: [
        {
            id: 4,
            name: 'Client',
            permissions: []
        }
    ],
    groupsCascadeDown: []
};

export const mockSignUp = {
    invite: 'invite',
    data: {
        firstName: 'name',
        lastName: 'name',
        password: 'password',
        passwordConfirm: 'password'
    }
};

export const mockConfirmResetPassword = {
    confirm: 'confirm',
    data: {
        password: 'password'
    }
};

export const mockDelete = {
    id: 1
};

export const mockRegister = {
    data: {
        group: Groups.Admin,
        email: 'admin@admin.com'
    }
};

export const mockUpdate = {
    id: 1,
    data: {
        group: Groups.Admin
    }
};

export const mockUpdateProfile = {
    data: {
        firstName: 'name',
        lastName: 'name',
        avatar: null
    }
};



