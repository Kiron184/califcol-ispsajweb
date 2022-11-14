/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2022 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import type { IJodit } from '../../../../types';
import type { CommitStyle } from '../commit-style';
/**
 * Add or remove styles to element
 * @param elm - The element to switch styles
 * @private
 */
export declare function toggleCommitStyles(commitStyle: CommitStyle, elm: HTMLElement, jodit: IJodit): boolean;
