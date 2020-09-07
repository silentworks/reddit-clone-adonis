/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import View from '@ioc:Adonis/Core/View'
import { formatDistanceToNow } from 'date-fns'

View.global('timeago', (date: number | Date) => {
    return formatDistanceToNow(new Date(date))
})
