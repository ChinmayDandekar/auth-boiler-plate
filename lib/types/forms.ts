

export type LoginFormTypes = {
    email: string
    password: string
}

export type LoginFormErrorTypes = Record<keyof LoginFormTypes, string | null>