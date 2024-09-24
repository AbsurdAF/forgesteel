import { Culture } from '../../../models/culture';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';

import './culture-panel.scss';

interface Props {
	culture: Culture;
	hero?: Hero;
	mode?: PanelMode;
}

export const CulturePanel = (props: Props) => {
	try {
		return (
			<div className='culture-panel'>
				<HeaderText level={1}>{props.culture.name}</HeaderText>
				<div className='ds-text description-text'>{props.culture.description}</div>
				{
					props.mode === PanelMode.Full ?
						<div style={{ paddingTop: '10px' }}>
							{props.culture.environment ? <FeaturePanel feature={props.culture.environment} hero={props.hero} /> : null}
							{props.culture.organization ? <FeaturePanel feature={props.culture.organization} hero={props.hero} /> : null}
							{props.culture.upbringing ? <FeaturePanel feature={props.culture.upbringing} hero={props.hero} /> : null}
						</div>
						: null
				}
			</div>
		);
	} catch {
		return null;
	}
};
