import { Context, ContextOptions } from 'clime';
export declare class SlackUser {
    readonly id: string;
    readonly name: string;
    constructor(id: string, name: string);
    toString(): string;
    static cast(text: string): SlackUser;
}
export declare class SlackChannel {
    readonly id: string;
    readonly name: string;
    constructor(id: string, name: string);
    toString(): string;
    static cast(text: string): SlackChannel;
}
export declare class SlackCommandContext extends Context {
    token: string;
    team_id: string;
    team_domain: string;
    enterprise_id: string;
    enterprise_name: string;
    channel_id: string;
    channel_name: string;
    user_id: string;
    user_name: string;
    command: string;
    text: string;
    response_url: string;
    trigger_id: string;
    user: SlackUser;
    channel: SlackChannel;
    constructor(options: ContextOptions, contextExtension: object);
}
export interface SlackAttachmentField {
    /**
     * Shown as a bold heading above the `value` text. It cannot contain markup
     * and will be escaped for you.
     */
    title: string;
    /**
     * The text value of the field. It may contain standard message markup and
     * must be escaped as normal. May be multi-line.
     */
    value: string;
    /**
     * An optional flag indicating whether the `value` is short enough to be
     * displayed side-by-side with other values.
     */
    short?: boolean;
}
export interface SlackAttachment {
    /**
     * A plain-text summary of the attachment. This text will be used in clients
     * that don't show formatted text (eg. IRC, mobile notifications) and should
     * not contain any markup.
     */
    fallback?: string;
    /**
     * Like traffic signals, color-coding messages can quickly communicate intent
     * and help separate them from the flow of other messages in the timeline.
     *
     * An optional value that can either be one of `good`, `warning`, `danger`,
     * or any hex color code (eg. `#439FE0`). This value is used to color the
     * border along the left side of the message attachment.
     */
    color?: string;
    /**
     * This is optional text that appears above the message attachment block.
     */
    pretext?: string;
    /**
     * Small text used to display the author's name.
     */
    author_name?: string;
    /**
     * A valid URL that will hyperlink the `author_name` text mentioned above.
     * Will only work if `author_name` is present.
     */
    author_link?: string;
    /**
     * A valid URL that displays a small 16x16px image to the left of the
     * `author_name` text. Will only work if `author_name` is present.
     */
    author_icon?: string;
    /**
     * The title is displayed as larger, bold text near the top of a message
     * attachment.
     */
    title?: string;
    /**
     * By passing a valid URL in the title_link parameter (optional), the title
     * text will be hyperlinked.
     */
    title_link?: string;
    /**
     * This is the main text in a message attachment, and can contain standard
     * message markup. The content will automatically collapse if it contains
     * 700+ characters or 5+ linebreaks, and will display a "Show more..." link
     * to expand the content. Links posted in the `text` field will not unfurl.
     *
     * > You must include either the `text` or `fallback` property, otherwise the
     * > attachment will not be displayed correctly! The value of each property
     * > can be an empty string (" ").
     */
    text?: string;
    /**
     * Fields are defined as an array, and hashes contained within it will be
     * displayed in a table inside the message attachment.
     */
    fields?: SlackAttachmentField[];
    /**
     * A valid URL to an image file that will be displayed inside a message
     * attachment. We currently support the following formats: GIF, JPEG, PNG,
     * and BMP.
     *
     * Large images will be resized to a maximum width of 400px or a maximum
     * height of 500px, while still maintaining the original aspect ratio.
     */
    image_url?: string;
    /**
     * A valid URL to an image file that will be displayed as a thumbnail on the
     * right side of a message attachment. We currently support the following
     * formats: GIF, JPEG, PNG, and BMP.
     *
     * The thumbnail's longest dimension will be scaled down to 75px while
     * maintaining the aspect ratio of the image. The filesize of the image must
     * also be less than 500 KB.
     *
     * For best results, please use images that are already 75px by 75px.
     */
    thumb_url?: string;
    /**
     * Add some brief text to help contextualize and identify an attachment.
     * Limited to 300 characters, and may be truncated further when displayed to
     * users in environments with limited screen real estate.
     */
    footer?: string;
    /**
     * To render a small icon beside your footer text, provide a publicly
     * accessible URL string in the footer_icon field. You must also provide a
     * footer for the field to be recognized.
     *
     * We'll render what you provide at 16px by 16px. It's best to use an image
     * that is similarly sized.
     */
    footer_icon?: string;
    /**
     * Does your attachment relate to something happening at a specific time?
     *
     * By providing the ts field with an integer value in "epoch time", the
     * attachment will display an additional timestamp value as part of the
     * attachment's footer.
     *
     * Use ts when referencing articles or happenings. Your message will have its
     * own timestamp when published.
     */
    ts?: number;
    mrkdwn_in?: ('pretext' | 'text' | 'fields')[];
}
export interface SlackCommandResponse {
    text?: string;
    username?: string;
    attachments?: SlackAttachment[];
    mrkdwn?: boolean;
}
export declare function isSlackCommandResponse(object: any): object is SlackCommandResponse;
