import {ref, watch} from "vue";
import {useRequest} from "@/hooks/useRequest.js";
import i18n from '@/i18n';

/**
 * Хук управления полями формы
 * @param formFields{Array} - видимые поля формы
 * @param hiddenFormFields{Array} - скрытые поля формы
 */
export function useForm(formFields, hiddenFormFields=[]) {
    const { request, isLoading, isError, message } = useRequest();

    /** Правила валидации полей **/
    const rules = {
        required: (value) => (!!value || i18n.global.t('messages.error.required')),
        password: (value) => {
            if (value.length < 8) return i18n.global.t('messages.error.password_length');
            else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/.test(value))
                return i18n.global.t('messages.error.password_format');
            return true;
        },
        passwordConfirmation: (value) => (fields.value.find(field => field.name === "password").value === value || i18n.global.t('messages.error.passwords_not_match'))
    };

    /** Пресеты полей **/
    const defineFields = {
        name: {
            name: 'name',
            label: i18n.global.t('parameters.name'),
            type: 'text',
            placeholder: i18n.global.t('placeholders.enter.name'),
            rule: rules.required
        },
        login: {
            name: 'login',
            label: i18n.global.t('parameters.login'),
            type: 'text',
            placeholder: i18n.global.t('placeholders.enter.login'),
            rule: rules.required
        },
        file: {
            name: 'file',
            label: i18n.global.t('parameters.file'),
            type: 'text',
            placeholder: i18n.global.t('placeholders.select.file'),
            rule: rules.required
        },
        selectBD: {
            name: 'database_id',
            label: i18n.global.t('parameters.database'),
            type: 'selectRequest',
            replace: {
                value: "id",
                name: "name"
            },
            table: "databases",
            placeholder: i18n.global.t('placeholders.select.database'),
            rule: rules.required
        },
        selectBDType: {
            name: 'type_id',
            label: i18n.global.t('parameters.type_database'),
            type: 'selectRequest',
            replace: {
                value: "id",
                name: "name"
            },
            table: "database_types",
            placeholder: i18n.global.t('placeholders.select.type_database'),
            rule: rules.required
        },
        selectServer: {
            name: 'server_id',
            label: i18n.global.t('parameters.server'),
            type: 'selectRequest',
            replace: {
                value: "id",
                name: "name"
            },
            table: "servers",
            placeholder: i18n.global.t('placeholders.select.server'),
            rule: rules.required
        },
        selectGit: {
            name: 'git_id',
            label: 'GIT',
            type: 'selectRequest',
            placeholder: i18n.global.t('placeholders.select.git'),
            replace: {
              value: "id",
              name: "url"
            },
            table: "gits",
            rule: rules.required
        },
        password: {
            name: 'password',
            label: i18n.global.t('parameters.password'),
            type: 'password',
            placeholder: i18n.global.t('placeholders.enter.password'),
            rule: rules.password
        },
        password_confirmation: {
            name: 'password_confirmation',
            label: i18n.global.t('parameters.confirm_password'),
            type: 'password',
            placeholder: i18n.global.t('placeholders.enter.confirm_password'),
            rule: rules.passwordConfirmation
        },
        token: {
            name: 'token',
            label: i18n.global.t('parameters.token'),
            type: 'text',
            placeholder: i18n.global.t('placeholders.enter.token'),
            rule: rules.required
        },
        id: {
            name: 'id',
            label: 'ID',
            type: 'text',
            placeholder: i18n.global.t('placeholders.enter.id'),
            rule: rules.required
        },
        url: {
            name: 'url',
            label: 'URL',
            type: 'text',
            placeholder: i18n.global.t('placeholders.enter.url'),
            rule: rules.required
        },
    };

    /** Флаг валидности формы **/
    const isValid = ref(false);

    /** Поля формы **/
    const fields = ref(
        formFields.map((field) => {
            if (defineFields[field.key]) {
                const { name, label, type, placeholder, rule, table, replace } = defineFields[field.key];
                const fieldObj = {
                    name: field.name || name,
                    label: field.label || label,
                    type: field.type || type,
                    code: field.key,
                    placeholder: field.placeholder || placeholder,
                    value: field.value || "",
                    required: !!field.required,
                    isValid: true,
                    error: field.error || "",
                    rule: field.validate ? rule : null,
                    options: field.options,
                    id: field.id || Math.random().toString(16).slice(2),
                    touched: false
                }
                if(type === "selectRequest"){
                    fieldObj.options = ref([]);
                    request({
                        method: 'get',
                        url: import.meta.env.VITE_API_URL + '/list',
                        params: {
                            table: table,
                        }
                    }).then(result => {
                        fieldObj.options.value = result.data.data.map(record => {
                            return {
                                value: record[replace.value],
                                name: record[replace.name]
                            }
                        });
                    }).catch(error => {
                        console.error(i18n.global.t('messages.error.load_data') + ":", error);
                    })

                }
                return fieldObj;
            } else {

            }
            return [];
        }).filter(Boolean)
    );

    /** Скрытые поля формы **/
    const hiddenFields = ref(
        hiddenFormFields.map((field) => {
            if (defineFields[field.name]) {
                const { name, type } = defineFields[field.name];
                return { name, type, value: field.value || "" };
            }
            return [];
        }).filter(Boolean)
    );

    /**
     * Отчистка полей
     */
    const clearValues = () => {
        fields.value.forEach(field => {
            field.value = "";
            field.error = "";
            field.isValid = true;
            field.touched = false;
        });
        hiddenFields.value.forEach(field => field.value = "");
    }

    /**
     * Валидация одного поля
     * @param field{Object} - поле формы
     */
    const validateField = (field) => {
        if (field.rule) {
            const result = field.rule(field.value);
            if (result === true) {
                field.isValid = true;
                field.error = "";
            } else {
                field.isValid = false;
                field.error = result;
                isValid.value = false;
            }
        }
    };

    /**
     * Валидация всех полей формы
     * @return {Boolean}
     */
    const validate = () => {
        isValid.value = true;
        fields.value.forEach((field) => validateField(field));
        return isValid.value;
    };

    /**
     * Получение данных для отправки формы
     * @return {Object}
     */
    const getFieldsDataToRequest = () => {
        return [...hiddenFields.value, ...fields.value].reduce((accumulator, currentValue) => {
            accumulator[currentValue.name] = currentValue.value;
            return accumulator;
        }, {});
    };

    /**
     * Вызов валидации поля при изменении значения
     * @param field{Object} - поле формы
     */
    fields.value.forEach((field) => {
        watch(field, () => validateField(field));
    });

   return {fields, hiddenFields, isValid, clearValues, validate, getFieldsDataToRequest}
}
