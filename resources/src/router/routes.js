const routes = [
    {
        path: '/auth',
        name: 'Authorization',
        component: () => import('@/views/AuthView.vue'),
        meta: { group: [], title: 'pages.auth', requiresGuest: true }
    },
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/MainView.vue'),
        meta: { group: [], title: 'pages.main' }
    },
    {
        path: '/sites/',
        name: 'Sites',
        component: () => import('@/views/viewListData/SitesView.vue'),
        meta: { group: ["main"], title: 'pages.websites' },
    },
    {
        path: '/sites/:id',
        name: 'SiteDetail',
        component: () => import('@/views/SiteDetailView.vue'),
        props: true,
        meta: { group: ["siteDetail"], title: 'pages.website_details' },
    },
    {
        path: '/servers/',
        name: 'Servers',
        component: () => import('@/views/viewListData/ServersView.vue'),
        meta: { group: ["main"], title: 'pages.servers' },
    },
    {
        path: '/databases/',
        name: 'Databases',
        component: () => import('@/views/viewListData/DataBasesView.vue'),
        meta: { group: ["main"], title: 'pages.databases' },
    },
    {
        path: '/gits/',
        name: 'Gits',
        component: () => import('@/views/viewListData/GitsView.vue'),
        meta: { group: ["main"], title: 'pages.git' },
    },
    {
        path: '/users/',
        name: 'Users',
        component: () => import('@/views/viewListData/UsersView.vue'),
        meta: { group: ["main"], title: 'pages.users' },
    },
    {
        path: '/user-settings/',
        name: 'UserSettings',
        component: () => import('@/views/UserSettingsView.vue'),
        meta: { group: ["settings"], title: 'pages.profile_settings' },
    },
    {
        path: '/about/',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: { group: ["settings"], title: 'pages.about_app' },
    },
    {
        path: '/sites-form/:id?',
        name: 'SitesForm',
        props: true,
        component: () => import('@/views/form/SiteFormView.vue'),
        meta: { group: ["bdForm"], title: 'pages.add_website', notShowHead: true },
    },
    {
        path: '/servers-form/:id?',
        name: 'ServersForm',
        props: true,
        component: () => import('@/views/form/ServerFormView.vue'),
        meta: { group: ["bdForm"], title: 'pages.add_server', notShowHead: true },
    },
    {
        path: '/databases-form/:id?',
        name: 'DatabasesForm',
        props: true,
        component: () => import('@/views/form/DataBaseFormView.vue'),
        meta: { group: ["bdForm"], title: 'pages.add_database', notShowHead: true },
    },
    {
        path: '/git-form/:id?',
        name: 'GitForm',
        props: true,
        component: () => import('@/views/form/GitFormView.vue'),
        meta: { group: ["bdForm"], title: 'pages.add_git', notShowHead: true },
    },
    {
        path: '/user-form/:id?',
        name: 'UserForm',
        props: true,
        component: () => import('@/views/form/UserFormView.vue'),
        meta: { group: ["bdForm"], title: 'pages.add_user', notShowHead: true },
    },
];

export default routes;