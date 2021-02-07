import React from "react";
import { Tile, Block, Image } from "@faramo.zayw/reabulma";
import styles from "./Map.module.css";
import { CoolBox, UserLink, ForkButton, MarkdownRemark } from "../../common";
import { MapConfig } from "../../components/MapPreviewCard";
import { Map, User } from "../../types/graphql";
import { fakeScreenshots } from "./Map";

export interface MapInfoProps extends Map {
	isAuth?: boolean;
	screenshots?: typeof fakeScreenshots;
	user?: User;
}

export const MapInfo: React.FC<MapInfoProps> = ({
	author,
	description,
	screenshots,
	isAuth,
	user,
	...props
}) => (
	<Tile tag="section" isAncestor style={{ width: "100%" }}>
		<Tile isParent isVertical className="is-3">
			<Tile isChild>
				<Tile isChild className="content">
					<CoolBox title="common" className={styles.common}>
						<Block className={styles.config}>
							<MapConfig {...props} />
						</Block>
						<Block>
							<span>co-author: </span>
							<UserLink {...author} />, <UserLink {...author} />,{" "}
							<UserLink {...author} />
						</Block>
						<Block>
							<ForkButton
								isFullWidth
								isAuth={isAuth}
								userId={user?.id}
								ownerId={author.id}
							/>
						</Block>
					</CoolBox>
				</Tile>
			</Tile>
		</Tile>
		<Tile isParent isVertical style={{ alignSelf: "baseline" }}>
			{!!description?.trim() && (
				<Tile isChild className="content">
					<CoolBox title="description" className={styles.description}>
						<MarkdownRemark markdown={description} />
					</CoolBox>
				</Tile>
			)}
			<Tile isChild>
				<CoolBox title="screenshots" className={styles.screenshots}>
					<section>
						{screenshots?.map(({ src, alt }) => (
							<Image isSize="128x128" src={src} alt={alt} />
						))}
					</section>
				</CoolBox>
			</Tile>
		</Tile>
	</Tile>
);
